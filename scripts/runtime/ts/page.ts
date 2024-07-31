import { Foo } from "@lib/foo";
import { Error } from "@lib/bar";

function Hello(): string {
  return `Hello, ${Foo()}!`;
}

function SomethingError() {
  console.log("Enter SomethingError test case");
  Error("success");
  console.log("Success SomethingError test case");
  Error("error");
  console.log("Invalid SomethingError test case, should not be printed");
}
