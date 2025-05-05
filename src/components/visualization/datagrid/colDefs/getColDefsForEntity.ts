import type { AvailableEntities } from "@models/entityFetchMethods";
import type { GridColDef } from "@mui/x-data-grid";
import {
  fisheryActivityColumns,
  fisheryActivityColumnVisibilityModel,
} from "./fisheryActivity";

export function getColDefsForEntity(
  entity: AvailableEntities,
): [GridColDef[], Record<string, boolean>] {
  switch (entity) {
    case "fisheryActivity":
      return [fisheryActivityColumns, fisheryActivityColumnVisibilityModel];
    default:
      const compileTimeCheck: never = entity;
      throw new Error(
        `No cell definitions found for entity: ${compileTimeCheck as string}`,
      );
  }
}
