export const availableEntities = [
  "fisheryActivity",
  "fishingFacility",
] as const;
export type AvailableEntities = (typeof availableEntities)[number];

export const availableFetchMethods = ["gRPC", "REST", "WebSocket"] as const;
export type AvailableFetchMethods = (typeof availableFetchMethods)[number];

export const availalbeEntityFetchMethods = {
  fisheryActivity: ["gRPC", "REST", "WebSocket"],
  fishingFacility: ["gRPC", "REST", "WebSocket"],
} as const satisfies Record<AvailableEntities, AvailableFetchMethods[]>;

export type EntityFetchMethods = typeof availalbeEntityFetchMethods;

export type WebSocketEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "WebSocket"
      ? Entity
      : never
    : never;
}[AvailableEntities];

export type RestEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "REST"
      ? Entity
      : never
    : never;
}[AvailableEntities];

export type GrpcEntities = {
  [Entity in AvailableEntities]: EntityFetchMethods[Entity] extends (infer FetchMethod)[]
    ? FetchMethod extends "gRPC"
      ? Entity
      : never
    : never;
}[AvailableEntities];
