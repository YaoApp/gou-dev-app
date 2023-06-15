const lib = Require("runtime.lib");
const { Foo } = Require("runtime.lib");

function Hello() {
  return {
    "lib.Foo": lib.Foo(),
    foo: Foo(),
  };
}
