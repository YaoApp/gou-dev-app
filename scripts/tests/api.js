function hello(name) {
  return "hello:" + name;
}

// Stream unit-test
function Stream(payload) {
  for (var i = 0; i < 10; i++) {
    if (i == 5) {
      cancel();
      return;
    }
    ssEvent("message", { foo: `${payload.foo}${i}` });
    time.Sleep(200);
  }
}

// Process Guard
function Auth(path, params, query, payload, headers) {
  if (params["name"] != "hi") {
    throw new Exception("failure param", 400);
  }

  if (payload.response == "success") {
    if (query.sid) {
      var id = Process("session.Get", "id");
      if (id != 1) {
        throw new Exception("failure sid", 403);
      }
    }
    return;
  }
  throw new Exception("failure", 403);
}

// IsRoot
function IsRoot() {
  return __YAO_SU_ROOT;
}
