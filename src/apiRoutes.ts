import type {
  EntityFetchMethods,
  RestEntities,
  WebSocketEntities,
} from "@models/entityFetchMethods";

const httpGatewayBaseUrl =
  process.env.NEXT_PUBLIC_HTTP_GATEWAY_BASE_URL ?? "http://localhost:8080";
const wsGatewayBaseUrl =
  process.env.NEXT_PUBLIC_WS_GATEWAY_BASE_URL ?? "ws://localhost:8080";
const grpcGatewayBaseUrl =
  process.env.NEXT_PUBLIC_GRPC_GATEWAY_BASE_URL ?? "http://localhost:9090";
const internalGatewayBaseUrl =
  process.env.INTERNAL_GATEWAY_BASE_URL ?? "http://localhost:8080";

type ApiRoutes = Record<string, unknown> & {
  entities: {
    [Entity in RestEntities | WebSocketEntities]: Record<
      EntityFetchMethods[Entity][number] extends "WebSocket" | "REST"
        ? Entity
        : never,
      string
    >;
  };
};

export const apiRoutes = {
  baseGrpc: `${grpcGatewayBaseUrl}`,
  auth: {
    login: `${internalGatewayBaseUrl}/auth`,
    wsToken: `${httpGatewayBaseUrl}/ws-auth-token`,
  },
  entities: {
    fisheryActivity: {
      REST: `${httpGatewayBaseUrl}/rest/fisheryActivities`,
      WebSocket: `${wsGatewayBaseUrl}/ws/data/fishery-activity`,
    },
    fishingFacility: {
      REST: `${httpGatewayBaseUrl}/rest/fishingFacilities`,
      WebSocket: `${wsGatewayBaseUrl}/ws/data/fishing-facility`,
    },
  } as const,
} satisfies ApiRoutes;

export function getWebSocketUrlWithSessionTokenForEntity(
  entity: WebSocketEntities,
  sessionToken: string,
): string {
  const url = apiRoutes.entities[entity].WebSocket;
  return `${url}?session=${sessionToken}`;
}
