import type {
  AvailableEntities,
  EntityFetchMethods,
} from "@models/entityFetchMethods";

const gatewayBaseUrl = process.env.GATEWAY_BASE_URL ?? "http://localhost:8080";
const rabbitAPIBaseUrl =
  process.env.RABBIT_API_BASE_URL ?? "http://localhost:8080";

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
    login: `${gatewayBaseUrl}/auth/login`,
  },
  entities: {
    fisheryActivity: {
      gRPC: `${gatewayBaseUrl}/grpc/fishery-activity`,
      rest: `${gatewayBaseUrl}/rest/fishery-activity`,
      websocket: `${rabbitAPIBaseUrl}/fishery-activity`,
    },
  } as const,
} satisfies ApiRoutes;

export type FetchMethodFromEntity<Entity extends AvailableEntities> =
  Entity extends keyof typeof apiRoutes.entities
    ? (typeof apiRoutes.entities)[Entity] extends Record<infer K, unknown>
      ? K
      : never
    : never;
