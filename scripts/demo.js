function Echo(...args) {
  console.log("hello world", args);
  return args;
}

function Data() {
  Process(
    "yao.table.Insert",
    "pet",
    ["name", "type", "status", "mode", "stay", "cost", "doctor_id"],
    [
      ["Cookie", "cat", "checked", "enabled", 200, 105, 1],
      ["Baby", "dog", "checked", "enabled", 186, 24, 1],
      ["Poo", "others", "checked", "enabled", 199, 66, 1],
    ]
  );
}
