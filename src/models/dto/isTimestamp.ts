import { isGoogleTimestamp } from "@/grpc/typevalidators/timestamp";

export function isTimestamp(value: unknown): boolean {
  return (
    typeof value === "undefined" ||
    value === null ||
    isGoogleTimestamp(value) ||
    typeof value === "string" ||
    typeof value === "number"
  );
}
