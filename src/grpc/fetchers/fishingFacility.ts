import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

import { apiRoutes } from "@/apiRoutes";
import { FishingFacilityService } from "../generated/fishingFacility_pb";

const transport = createGrpcWebTransport({
  baseUrl: apiRoutes.baseGrpc,
});

const fishingFacilityClient = createClient(FishingFacilityService, transport);

export async function fetchFishingFacility(token: string) {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fishingFacilityClient.listFishingFacilities(
    {},
    { headers },
  );
  return response.facilities;
}
