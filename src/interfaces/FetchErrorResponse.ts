interface ErrorResponse {
  data: string;
}

function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "data" in obj &&
    typeof obj.data === "string"
  );
}

export type { ErrorResponse };
export { isErrorResponse };
