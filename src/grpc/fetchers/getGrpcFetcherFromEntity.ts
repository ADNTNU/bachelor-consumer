import type { GrpcEntities } from "@models/entityFetchMethods";
import { fetchFisheryActivity } from "./fisheryActivity";
import { fetchFishingFacility } from "./fishingFacility";
import type { WithId } from "@models/utils";

type GrpcFetchFunction = (token: string) => Promise<WithId[]>;

export const grpcClientFromEntity: Record<GrpcEntities, GrpcFetchFunction> = {
  fisheryActivity: fetchFisheryActivity,
  fishingFacility: fetchFishingFacility,
} satisfies Record<GrpcEntities, GrpcFetchFunction>;
