import type { FishingFacilityDto } from "@models/dto/fishingFacility";
import type { TypeSafeColDef } from "./common";

type AggregateFields = object;

export const fishingFacilityColumns: TypeSafeColDef<
  FishingFacilityDto,
  AggregateFields
>[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    minWidth: 75,
    maxWidth: 100,
    description: "ID of the fishing facility",
  },
  {
    field: "vesselName",
    headerName: "Vessel Name",
    flex: 1,
    minWidth: 100,
    maxWidth: 200,
    description: "Name of the vessel",
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
];

export const fishingFacilityColumnVisibilityModel: Record<
  (typeof fishingFacilityColumns)[number]["field"],
  boolean
> = {
  $typeName: false,
  $unknown: false,
  id: true,
  bbox: true,
  comment: true,
  geometry: true,
  imo: true,
  ircs: true,
  lastChangedBySource: true,
  lastChangedDateTime: true,
  mmsi: true,
  regNum: true,
  removedDateTime: true,
  removedProcessedTime: true,
  sbrRegNum: true,
  setupDateTime: true,
  setupProcessedTime: true,
  source: true,
  toolColor: true,
  toolCount: true,
  toolId: true,
  toolTypeCode: true,
  toolTypeName: true,
  type: true,
  version: true,
  vesselEmail: true,
  vesselName: true,
  vesselPhone: true,
};
