/**
 * Test All - execute multiple processes concurrently, wait for all results.
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestAll")
 */
function TestAll() {
  var results = All([
    { process: "scripts.runtime.basic.Hello", args: ["task_0"] },
    { process: "scripts.runtime.basic.Hello", args: ["task_1"] },
    { process: "scripts.runtime.basic.Hello", args: ["task_2"] },
  ]);

  // Verify: all 3 results returned, order preserved
  if (results.length !== 3) {
    throw new Exception("TestAll: expected 3 results, got " + results.length, 500);
  }
  if (results[0].data !== "task_0") {
    throw new Exception("TestAll: result[0] mismatch: " + JSON.stringify(results[0]), 500);
  }
  if (results[1].data !== "task_1") {
    throw new Exception("TestAll: result[1] mismatch: " + JSON.stringify(results[1]), 500);
  }
  if (results[2].data !== "task_2") {
    throw new Exception("TestAll: result[2] mismatch: " + JSON.stringify(results[2]), 500);
  }
  return "PASS";
}

/**
 * Test All with one task that errors - other tasks should still complete.
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestAllWithError")
 */
function TestAllWithError() {
  var results = All([
    { process: "scripts.runtime.basic.Hello", args: ["ok_task"] },
    { process: "scripts.runtime.basic.Error", args: ["will_error"] },
    { process: "scripts.runtime.basic.Hello", args: ["ok_task_2"] },
  ]);

  if (results.length !== 3) {
    throw new Exception("TestAllWithError: expected 3 results, got " + results.length, 500);
  }

  // First task should succeed
  if (results[0].data !== "ok_task") {
    throw new Exception("TestAllWithError: result[0] mismatch: " + JSON.stringify(results[0]), 500);
  }

  // Second task should have an error
  if (!results[1].error || results[1].error === "") {
    throw new Exception("TestAllWithError: result[1] expected error: " + JSON.stringify(results[1]), 500);
  }

  // Third task should succeed
  if (results[2].data !== "ok_task_2") {
    throw new Exception("TestAllWithError: result[2] mismatch: " + JSON.stringify(results[2]), 500);
  }

  return "PASS";
}

/**
 * Test Any - returns when first task succeeds.
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestAny")
 */
function TestAny() {
  var results = Any([
    { process: "scripts.runtime.basic.Hello", args: ["fast_result"] },
    { process: "scripts.runtime.basic.Cancel", args: ["slow_result"] },
  ]);

  // At least the first fast task should have a result
  var hasSuccess = false;
  for (var i = 0; i < results.length; i++) {
    if (results[i].data && !results[i].error) {
      hasSuccess = true;
      break;
    }
  }

  if (!hasSuccess) {
    throw new Exception("TestAny: expected at least one successful result: " + JSON.stringify(results), 500);
  }

  return "PASS";
}

/**
 * Test Race - returns when first task completes (success or failure).
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestRace")
 */
function TestRace() {
  var results = Race([
    { process: "scripts.runtime.basic.Hello", args: ["fast_result"] },
    { process: "scripts.runtime.basic.Cancel", args: ["slow_result"] },
  ]);

  // At least one result should be populated
  var hasResult = false;
  for (var i = 0; i < results.length; i++) {
    if (results[i].data || results[i].error) {
      hasResult = true;
      break;
    }
  }

  if (!hasResult) {
    throw new Exception("TestRace: expected at least one result: " + JSON.stringify(results), 500);
  }

  return "PASS";
}

/**
 * Test All with empty tasks array - should return empty array.
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestAllEmpty")
 */
function TestAllEmpty() {
  var results = All([]);
  if (results.length !== 0) {
    throw new Exception("TestAllEmpty: expected 0 results, got " + results.length, 500);
  }
  return "PASS";
}

/**
 * Test All concurrency with sleep - 3 tasks each sleep 500ms should complete in ~500ms not ~1500ms.
 * Uses scripts.runtime.basic.Cancel which sleeps 500ms then returns args[0].
 * Invoked via Go test: process.Of("scripts.runtime.concurrent.TestAllConcurrency")
 */
function TestAllConcurrency() {
  var start = Date.now();
  var results = All([
    { process: "scripts.runtime.basic.Cancel", args: ["task_0"] },
    { process: "scripts.runtime.basic.Cancel", args: ["task_1"] },
    { process: "scripts.runtime.basic.Cancel", args: ["task_2"] },
  ]);
  var elapsed = Date.now() - start;

  console.log("TestAllConcurrency: 3 x 500ms tasks completed in " + elapsed + "ms");

  // Verify all results
  if (results.length !== 3) {
    throw new Exception("TestAllConcurrency: expected 3 results, got " + results.length, 500);
  }
  if (results[0].data !== "task_0") {
    throw new Exception("TestAllConcurrency: result[0] mismatch: " + JSON.stringify(results[0]), 500);
  }
  if (results[1].data !== "task_1") {
    throw new Exception("TestAllConcurrency: result[1] mismatch: " + JSON.stringify(results[1]), 500);
  }
  if (results[2].data !== "task_2") {
    throw new Exception("TestAllConcurrency: result[2] mismatch: " + JSON.stringify(results[2]), 500);
  }

  // If truly concurrent: ~500ms. If sequential: ~1500ms.
  // Allow margin but must be less than 1200ms.
  if (elapsed >= 1200) {
    throw new Exception(
      "TestAllConcurrency: tasks appear to run sequentially! elapsed=" + elapsed + "ms (expected <1200ms)",
      500
    );
  }

  return "PASS";
}
