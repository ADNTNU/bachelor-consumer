export type WsTokenResponse = {
  wsToken: string;
};

export function isWsTokenResponse(obj: unknown): obj is WsTokenResponse {
  if (typeof obj !== "object" || obj === null) return false;

  const data = obj as Record<string, unknown>;

  return "wsToken" in data && typeof data.wsToken === "string";
}
