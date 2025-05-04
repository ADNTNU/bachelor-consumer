import type { FisheryActivity as FisheryActivityDto } from "@models/dto/fisheryActivity";
import type { TypeSafeColDef } from "./common";

type AggregateFields = object;

export const fisheryActivityColumns: TypeSafeColDef<FisheryActivityDto, AggregateFields>[] = [{field: "id", headerName: "ID", flex: 1, minWidth: 100, maxWidth: 200, description: "ID of the fishery activity"}];

export const fisheryActivityColumnVisibilityModel: Record<
(typeof fisheryActivityColumns)[number]["field"],
boolean
> = {
  id: true,
};
