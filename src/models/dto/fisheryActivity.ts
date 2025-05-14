import type { ListFisheryActivitiesResponse } from "@/grpc/generated/fisheryActivity_pb";
import type { CompileTimeCheck } from "@models/utils";
import { isTimestamp } from "./isTimestamp";
import { isId } from "./isId";

type RawActivity = ListFisheryActivitiesResponse["activities"][number];

type RequireAllKeys<T, U extends { [K in keyof T]: unknown }> = U;

export type FisheryActivityDto = RequireAllKeys<
  RawActivity,
  {
    $typeName: RawActivity["$typeName"];
    $unknown: RawActivity["$unknown"];
    id: RawActivity["id"] | number | string;
    startingPointLat: RawActivity["startingPointLat"];
    startingPointLon: RawActivity["startingPointLon"];
    toolId: RawActivity["toolId"];
    toolTypeCode: RawActivity["toolTypeCode"];
    toolTypeName: RawActivity["toolTypeName"];
    lastChangedDateTime:
      | RawActivity["lastChangedDateTime"]
      | string
      | number
      | null;
    removedDateTime: RawActivity["removedDateTime"] | string | number | null;
    setupDateTime: RawActivity["setupDateTime"] | string | number | null;
    length: RawActivity["length"];
    geometry: RawActivity["geometry"];
  }
>;

export function isListFisheryActivityDtoResponse(
  data: unknown,
): data is ListFisheryActivitiesResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    $typeName: _typeName,
    activities,
    $unknown: _unknown,
    ...rest
  } = data as ListFisheryActivitiesResponse;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in data:", Object.keys(compileTimeCheck));
  }
  return (
    "activities" in data &&
    Array.isArray(activities) &&
    activities.every((activity) => isFisheryActivityDto(activity))
  );
}

export function isFisheryActivityDto(
  data: unknown,
): data is FisheryActivityDto {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((activity) => isResponseFisheryActivity(activity));
}

export function isResponseFisheryActivity(
  data: unknown,
): data is FisheryActivityDto {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    $typeName: _typeName,
    id,
    startingPointLat,
    startingPointLon,
    toolId,
    toolTypeCode,
    toolTypeName,
    $unknown: _unknown,
    lastChangedDateTime,
    removedDateTime,
    setupDateTime,
    length,
    geometry,
    ...rest
  } = data as FisheryActivityDto;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in data:", Object.keys(compileTimeCheck));
  }
  return (
    "id" in data &&
    isId(id) &&
    "startingPointLat" in data &&
    typeof startingPointLat === "number" &&
    "startingPointLon" in data &&
    typeof startingPointLon === "number" &&
    "toolId" in data &&
    typeof toolId === "string" &&
    "toolTypeCode" in data &&
    typeof toolTypeCode === "string" &&
    "toolTypeName" in data &&
    typeof toolTypeName === "string" &&
    "lastChangedDateTime" in data &&
    isTimestamp(lastChangedDateTime) &&
    "removedDateTime" in data &&
    isTimestamp(removedDateTime) &&
    "setupDateTime" in data &&
    isTimestamp(setupDateTime) &&
    "length" in data &&
    typeof length === "number" &&
    "geometry" in data &&
    typeof geometry === "string"
  );
}
