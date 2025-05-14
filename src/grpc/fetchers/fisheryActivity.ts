import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { FisheryActivityService } from "../generated/fisheryActivity_pb";

import { apiRoutes } from "@/apiRoutes";

const transport = createGrpcWebTransport({
  baseUrl: apiRoutes.baseGrpc,
});

const fisheryActivityClient = createClient(FisheryActivityService, transport);

export async function fetchFisheryActivity(token: string) {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fisheryActivityClient.listFisheryActivities(
    {},
    { headers },
  );
  return response.activities;
}
