import type { CompileTimeCheck, UnknownKeys } from "../utils";

export type LoginRequestBody = {
  id: string;
  secret: string;
};

export type LoginResponseBody = {
  token: string;
  // ...other properties
  // role: UserRole;
};

export function isLoginResponseBody(data: unknown): data is LoginResponseBody {
  if (!data || typeof data !== "object") {
    return false;
  }

  const { token, ...rest } = data as UnknownKeys<LoginResponseBody>;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in LoginResponseBody", compileTimeCheck);
    // return false;
  }

  return "token" in data && typeof token === "string";
}
