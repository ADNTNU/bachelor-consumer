import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { CompileTimeCheck } from "@models/utils";

export function isGoogleTimestamp(data: unknown): data is Timestamp {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const {
    seconds,
    nanos,
    $typeName: _typeName,
    $unknown: _unknown,
    ...rest
  } = data as Timestamp;

  const compileTimeCheck: CompileTimeCheck = rest;

  if (Object.keys(compileTimeCheck).length > 0) {
    console.warn("Unexpected keys in data:", Object.keys(compileTimeCheck));
  }

  return (
    "seconds" in data &&
    typeof seconds === "bigint" &&
    "nanos" in data &&
    typeof nanos === "number"
  );
}
