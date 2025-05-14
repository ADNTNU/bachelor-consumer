export function isId(value: unknown): boolean {
  return (
    typeof value === "bigint" ||
    typeof value === "string" ||
    typeof value === "number"
  );
}
