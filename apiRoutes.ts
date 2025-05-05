import type {
  AvailableEntities,
  EntityFetchMethods,
  WebsocketEntities,
} from "@models/entityFetchMethods";

const httpGatewayBaseUrl =
  process.env.NEXT_PUBLIC_HTTP_GATEWAY_BASE_URL ?? "http://localhost:8080";
const wsGatewayBaseUrl =
  process.env.NEXT_PUBLIC_WS_GATEWAY_BASE_URL ?? "ws://localhost:8080";

type ApiRoutes = Record<string, unknown> & {
  entities: {
    [Entity in AvailableEntities]: Record<
      EntityFetchMethods[Entity][number],
      string
    >;
  };
};

export const apiRoutes = {
  auth: {
    login: `${httpGatewayBaseUrl}/auth/login`,
    wsToken: `${httpGatewayBaseUrl}/ws-auth-token`,
  },
  entities: {
    fisheryActivity: {
      gRPC: `${httpGatewayBaseUrl}/grpc/fishery-activity`,
      REST: `${httpGatewayBaseUrl}/rest/fishery-activity`,
      WebSocket: `${wsGatewayBaseUrl}/ws/data/fishery-activity`,
    },
  } as const,
} satisfies ApiRoutes;

export type FetchMethodFromEntity<Entity extends AvailableEntities> =
  Entity extends keyof typeof apiRoutes.entities
    ? (typeof apiRoutes.entities)[Entity] extends Record<infer K, unknown>
      ? K
      : never
    : never;

export function getWebSocketUrlWithSessionTokenForEntity(
  entity: WebsocketEntities,
  sessionToken: string,
): string {
  const url = apiRoutes.entities[entity].WebSocket;
  return `${url}?session=${sessionToken}`;
}
