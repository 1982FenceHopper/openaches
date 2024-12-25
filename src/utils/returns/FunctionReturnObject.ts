export function ReturnObject(data: any, error: any | null | undefined) {
  if (error) {
    return {
      result: data,
      error: error,
    };
  } else {
    return {
      result: data,
      error: null,
    };
  }
}
