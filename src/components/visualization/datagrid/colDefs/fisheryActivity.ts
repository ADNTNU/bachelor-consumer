import type { FisheryActivityDto as FisheryActivityDto } from "@models/dto/fisheryActivity";
import type { TypeSafeColDef } from "./common";

type AggregateFields = object;

export const fisheryActivityColumns: TypeSafeColDef<
  FisheryActivityDto,
  AggregateFields
>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    minWidth: 75,
    maxWidth: 100,
    description: "ID of the fishery activity",
  },
  {
    field: "toolTypeName",
    headerName: "Tool Type Name",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Name of the tool type",
  },
  {
    field: "toolTypeCode",
    headerName: "Tool Type Code",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Code of the tool type",
  },
  {
    field: "toolId",
    headerName: "Tool ID",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "ID of the tool",
  },
  {
    field: "length",
    headerName: "Length",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Length of the fishery activity",
  },
  {
    field: "startingPointLat",
    headerName: "Starting Point Latitude",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Latitude of the starting point",
  },
  {
    field: "startingPointLon",
    headerName: "Starting Point Longitude",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Longitude of the starting point",
  },
];

export const fisheryActivityColumnVisibilityModel: Record<
  (typeof fisheryActivityColumns)[number]["field"],
  boolean
> = {
  $typeName: false,
  $unknown: false,
  id: true,
  length: true,
  startingPointLat: true,
  startingPointLon: true,
  toolId: true,
  toolTypeCode: true,
  toolTypeName: true,
  lastChangedDateTime: true,
  removedDateTime: true,
  setupDateTime: true,
  geometry: true,
};
