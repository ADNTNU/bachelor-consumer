import type { AvailableEntities } from "@models/entityFetchMethods";
import type { GridColDef } from "@mui/x-data-grid";
import {
  fisheryActivityColumns,
  fisheryActivityColumnVisibilityModel,
} from "./fisheryActivity";
import type { WithId } from "@models/utils";
import {
  fishingFacilityColumns,
  fishingFacilityColumnVisibilityModel,
} from "./fishingFacility";
import { isResponseFisheryActivity } from "@models/dto/fisheryActivity";
import { isResponseFishingFacility } from "@models/dto/fishingFacility";

export function getDataForEntity(
  entity: AvailableEntities,
): [GridColDef[], Record<string, boolean>, (data: unknown) => data is WithId] {
  switch (entity) {
    case "fisheryActivity":
      return [
        fisheryActivityColumns,
        fisheryActivityColumnVisibilityModel,
        isResponseFisheryActivity,
      ];
    case "fishingFacility":
      return [
        fishingFacilityColumns,
        fishingFacilityColumnVisibilityModel,
        isResponseFishingFacility,
      ];
    default:
      const compileTimeCheck: never = entity;
      throw new Error(
        `No cell definitions found for entity: ${compileTimeCheck as string}`,
      );
  }
}
