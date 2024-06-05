import * as Hello from "./lib/hello";
import { World as MyWorld, Add, Now, Foo } from "./lib/hello";
import {
  World as TheLongestFunctionNameInTheWorld,
  Add as TheLongestFunctionNameOfAddInTheWorld,
  Now as TheLongestFunctionNameOfNowInTheWorld,
} from "./lib/hello";

function Bar(): string[] {
  return [
    `Hello: ${Hello.World()} ${Hello.Add(1, 2)} ${Hello.Now()} ${Hello.Foo()}`,
    `MyWorld: ${MyWorld()} ${Add(1, 2)} ${Now()} ${Foo()}`,
    `TheLongestFunctionNameInTheWorld: ${TheLongestFunctionNameInTheWorld()} ${TheLongestFunctionNameOfAddInTheWorld(
      1,
      2
    )} ${TheLongestFunctionNameOfNowInTheWorld()} ${Foo()}`,
  ];
}

function FooBar(): string[] {
  return [
    `Hello: ${Hello.World()} ${Hello.Add(1, 2)} ${Hello.Now()} ${Hello.Foo()}`,
    `MyWorld: ${MyWorld()} ${Add(1, 2)} ${Now()} ${Foo()}`,
    `TheLongestFunctionNameInTheWorld: ${TheLongestFunctionNameInTheWorld()} ${TheLongestFunctionNameOfAddInTheWorld(
      1,
      2
    )} ${TheLongestFunctionNameOfNowInTheWorld()} ${Foo()}`,
  ];
}

export function BarExport(): string[] {
  return Bar();
}

function Ping() {
  return "pong";
}
