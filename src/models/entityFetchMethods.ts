export const availableEntities = ["fisheryActivity"] as const;
export type AvailableEntities = (typeof availableEntities)[number];

export const availableFetchMethods = ["gRPC", "rest", "websocket"] as const;
export type AvailableFetchMethods = (typeof availableFetchMethods)[number];

export const availalbeEntityFetchMethods = {
  fisheryActivity: ["gRPC", "rest", "websocket"],
} as const satisfies Record<AvailableEntities, AvailableFetchMethods[]>;

export type EntityFetchMethods = typeof availalbeEntityFetchMethods;

export type WebsocketEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "websocket"
      ? Entity
      : never
    : never;
}[AvailableEntities];

export type RestEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "rest"
      ? Entity
      : never
    : never;
}[AvailableEntities];

export type GrpcEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "grpc"
      ? Entity
      : never
    : never;
}[AvailableEntities];
