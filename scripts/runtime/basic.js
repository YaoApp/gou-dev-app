function Hello(...args) {
  return args[0];
}

function Cancel(...args) {
  time.Sleep(500);
  return args[0];
}

function Error(...args) {
  callStackTest(...args);
  return args[0];
}

function callStackTest(...args) {
  var obj = {};
  obj.a();
  return args;
}
