import { Exception } from "./yao";

/**
 * Error handling test cases
 */
export function TestThrowError(value: string) {
  if (value === "error") {
    throw new Exception("Error occurred", 400);
  }
}
