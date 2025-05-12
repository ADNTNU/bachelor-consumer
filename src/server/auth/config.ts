import { isLoginResponseBody, type LoginRequestBody } from "@models/dto/auth";
import type { RequireKeys } from "@models/utils";
import {
  type DefaultSession,
  type NextAuthConfig,
  type User,
  type Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  GenericLoginError,
  InvalidCredentialsError,
  UnknownResponseError,
} from "./CredentialSignInErrors";
import assert from "assert";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { apiRoutes } from "@/apiRoutes";

// /**
//  * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
//  * object and keep type safety.
//  *
//  * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
//  */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      // id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
    accessToken?: string;
    scopes?: string[];
  }

  interface User {
    accessToken?: string;
    emailVerified?: string | null;
    // ...other properties
    // role: UserRole;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    // id: string;
    accessToken?: string;
    user: Omit<User, "token">;
    expires?: number;
    scopes?: string[];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        clientId: { label: "Client ID", type: "text" },
        clientSecret: { label: "Client Secret", type: "password" },
      },
      /**
       * Authorize callback that is called when the user submits the login form.
       * Calls the backend API to authenticate the user and returns the User and JWT token if successful.
       * @returns {User | null} - Returns the user object if authentication is successful, otherwise null.
       */
      async authorize(credentials) {
        let res: Response;

        assert(
          typeof credentials.clientId === "string",
          "clientId must be a string",
        );
        assert(
          typeof credentials.clientSecret === "string",
          "clientSecret must be a string",
        );

        try {
          res = await fetch(apiRoutes.auth.login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: credentials.clientId,
              secret: credentials.clientSecret,
            } satisfies LoginRequestBody),
          });
        } catch (error) {
          console.error("Error in authorize callback:", error);
          throw new GenericLoginError("Error sending request to server");
        }

        if (res.status === 401) {
          throw new InvalidCredentialsError();
        }

        if (!res.ok) {
          throw new GenericLoginError(
            `Error in response from server. Status: ${res.status}`,
          );
        }

        try {
          const responseBody: unknown = await res.json();

          if (!isLoginResponseBody(responseBody)) {
            console.debug("Unexpected response body:", responseBody);
            throw new UnknownResponseError();
          }

          // const decodedToken = jwtDecode(responseBody.token);

          // console.debug("Token:", responseBody.token);
          // console.debug("Decoded token:", decodedToken);

          if (res.ok && responseBody.token) {
            return {
              accessToken: responseBody.token,
              image: null,
              id: undefined,
              name: null,
              email: null,
              emailVerified: null,
            } satisfies RequireKeys<User>;
          }
        } catch (error) {
          console.debug("Error in authorize callback:", error);
          throw new GenericLoginError("Error parsing response from server");
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // so you can store tokens
  },
  callbacks: {
    /**
     * jwt callback that is called whenever a JWT is created or updated.
     * @returns {JWT} - Returns the JWT object with the user and access token.
     */
    async jwt({ token, user }) {
      // console.debug("JWT callback:", { token, user });
      // If user just signed in, add user data to the token object
      if (user?.id) {
        const decodedToken = getAccessTokenPayload(user.accessToken);
        token.accessToken = user.accessToken;
        token.expires = decodedToken?.exp;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        token.scopes = decodedToken?.scopes ?? [];
      }

      // If token is reused, check if the access token is expired
      // and refresh it if needed
      const isTokenExpired = isAccessTokenExpired(token.expires);

      if (!isTokenExpired) {
        return token;
      }

      // If the token is expired, sign the user out
      return null;
    },
    async session({ session, token }) {
      // console.debug("Session callback:", { session, token });
      session.accessToken = token.accessToken;
      session.scopes = token.scopes ?? [];
      if (token.user.id) {
        session.user = {
          id: token.user.id,
          name: token.user.name,
          email: token.user.email ?? "",
          image: null,
          accessToken: token.accessToken,
          emailVerified: null,
        } satisfies RequireKeys<Session["user"]>;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

function getAccessTokenPayload(accessToken?: string) {
  if (!accessToken) return undefined;
  try {
    const decodedToken = jwtDecode<JwtPayload & { scopes: string[] }>(
      accessToken,
    );
    return decodedToken;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
}

function isAccessTokenExpired(exp?: number): boolean {
  if (!exp) return true; // if no expiration, assume expired
  const now = Date.now();
  const bufferMs = 5000;
  const expired = now + bufferMs > exp * 1000; // convert to milliseconds

  return expired;
}
