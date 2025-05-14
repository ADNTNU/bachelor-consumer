import type { ListFishingFacilitiesResponse } from "@/grpc/generated/fishingFacility_pb";
import type { CompileTimeCheck } from "@models/utils";
import { isTimestamp } from "./isTimestamp";
import { isId } from "./isId";

type RawFacility = ListFishingFacilitiesResponse["facilities"][number];

type RequireAllKeys<T, U extends { [K in keyof T]: unknown }> = U;

export type FishingFacilityDto = RequireAllKeys<
  RawFacility,
  {
    $typeName: RawFacility["$typeName"];
    $unknown: RawFacility["$unknown"];
    id: RawFacility["id"] | number | string;
    bbox: RawFacility["bbox"];
    comment: RawFacility["comment"];
    geometry: RawFacility["geometry"];
    imo: RawFacility["imo"];
    ircs: RawFacility["ircs"];
    lastChangedBySource: RawFacility["lastChangedBySource"];
    lastChangedDateTime:
      | RawFacility["lastChangedDateTime"]
      | string
      | number
      | null;
    mmsi: RawFacility["mmsi"];
    regNum: RawFacility["regNum"];
    removedDateTime: RawFacility["removedDateTime"] | string | number | null;
    removedProcessedTime:
      | RawFacility["removedProcessedTime"]
      | string
      | number
      | null;
    sbrRegNum: RawFacility["sbrRegNum"];
    setupDateTime: RawFacility["setupDateTime"] | string | number | null;
    setupProcessedTime:
      | RawFacility["setupProcessedTime"]
      | string
      | number
      | null;
    source: RawFacility["source"];
    toolColor: RawFacility["toolColor"];
    toolCount: RawFacility["toolCount"];
    toolId: RawFacility["toolId"];
    toolTypeCode: RawFacility["toolTypeCode"];
    toolTypeName: RawFacility["toolTypeName"];
    type: RawFacility["type"];
    version: RawFacility["version"];
    vesselEmail: RawFacility["vesselEmail"];
    vesselName: RawFacility["vesselName"];
    vesselPhone: RawFacility["vesselPhone"];
  }
>;

export function isListFishingFacilityDtoResponse(
  data: unknown,
): data is ListFishingFacilitiesResponse {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    $typeName: _typeName,
    $unknown: _unknown,
    facilities,
    ...rest
  } = data as ListFishingFacilitiesResponse;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in data:", Object.keys(compileTimeCheck));
  }
  return (
    "facilities" in data &&
    Array.isArray(facilities) &&
    facilities.every((facility) => isFishingFacilityDto(facility))
  );
}

export function isFishingFacilityDto(
  data: unknown,
): data is FishingFacilityDto {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((activity) => isResponseFishingFacility(activity));
}

export function isResponseFishingFacility(
  data: unknown,
): data is FishingFacilityDto {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    $typeName: _typeName,
    $unknown: _unknown,
    id,
    bbox,
    comment,
    geometry,
    imo,
    ircs,
    lastChangedBySource,
    lastChangedDateTime,
    mmsi,
    regNum,
    removedDateTime,
    removedProcessedTime,
    sbrRegNum,
    setupDateTime,
    setupProcessedTime,
    source,
    toolColor,
    toolCount,
    toolId,
    toolTypeCode,
    toolTypeName,
    type,
    version,
    vesselEmail,
    vesselName,
    vesselPhone,
    ...rest
  } = data as FishingFacilityDto;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in data:", Object.keys(compileTimeCheck));
  }
  return (
    "id" in data &&
    isId(id) &&
    "bbox" in data &&
    typeof bbox === "string" &&
    "comment" in data &&
    typeof comment === "string" &&
    "geometry" in data &&
    typeof geometry === "string" &&
    "imo" in data &&
    typeof imo === "string" &&
    "ircs" in data &&
    typeof ircs === "string" &&
    "lastChangedBySource" in data &&
    typeof lastChangedBySource === "string" &&
    "lastChangedDateTime" in data &&
    isTimestamp(lastChangedDateTime) &&
    "mmsi" in data &&
    typeof mmsi === "string" &&
    "regNum" in data &&
    typeof regNum === "string" &&
    "removedDateTime" in data &&
    isTimestamp(removedDateTime) &&
    "removedProcessedTime" in data &&
    isTimestamp(removedProcessedTime) &&
    "sbrRegNum" in data &&
    typeof sbrRegNum === "string" &&
    "setupDateTime" in data &&
    isTimestamp(setupDateTime) &&
    "setupProcessedTime" in data &&
    isTimestamp(setupProcessedTime) &&
    "source" in data &&
    typeof source === "string" &&
    "toolColor" in data &&
    typeof toolColor === "string" &&
    "toolCount" in data &&
    typeof toolCount === "number" &&
    "toolId" in data &&
    typeof toolId === "string" &&
    "toolTypeCode" in data &&
    typeof toolTypeCode === "string" &&
    "toolTypeName" in data &&
    typeof toolTypeName === "string" &&
    "type" in data &&
    typeof type === "string" &&
    "version" in data &&
    typeof version === "number" &&
    "vesselEmail" in data &&
    typeof vesselEmail === "string" &&
    "vesselName" in data &&
    typeof vesselName === "string" &&
    "vesselPhone" in data &&
    typeof vesselPhone === "string"
  );
}
