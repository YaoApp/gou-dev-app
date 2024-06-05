import { Foo as MyFoo } from "./foo";

export function World(): string {
  return `Hello World!  ${MyFoo()}`;
}

export function Now(): Date {
  return new Date();
}

export function Add(a: number, b: number): number {
  return a + b;
}

export function Foo() {
  return "Bar";
}
