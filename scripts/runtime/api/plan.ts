import { Plan, time } from "@yao/runtime";

function TestPlan() {
  const plan = new Plan("test-plan");

  // Subscribe to the plan events
  plan.Subscribe((task, shared, event) => {
    console.log(event);
    console.log(shared.Get("foo"));
    console.log(shared.Get("bar"));
    console.log(task.Data());
    console.log(task.Status());
    console.log(plan.Status());

    // retry the task
    if (task.Status() === "failed") {
      task.Retry();
    }
  });

  plan.AddTask("task-1", 1, (task, shared) => {
    shared.Set("foo", "hello");
    time.Sleep(1000);
    task.Notify("task-1 message");
  });

  plan.AddTask("task-2", 1, (task, shared) => {
    shared.Set("bar", "world");
    time.Sleep(500);
    task.Notify("task-2 message");
  });

  plan.AddTask("task-3", 2, (task, shared) => {
    const foo = shared.Get("foo");
    console.log(foo);
    time.Sleep(500);
    task.Notify("task-3 message");
  });

  plan.AddTask("task-4", 2, (task, shared) => {
    const bar = shared.Get("bar");
    console.log(bar);
    time.Sleep(500);
    task.Notify("task-4 message");
  });

  const ts = new Date();
  plan.Run(); // Run the plan synchronously
  console.log(`run: ${new Date().getTime() - ts.getTime()}`);
}

function testPlanAsync() {
  const plan = new Plan("test-plan");

  // Subscribe to the plan events
  plan.Subscribe((task, shared, event) => {
    console.log(event);
    console.log(shared.Get("foo"));
    console.log(task.Status());
    console.log(task.Data());
  });

  plan.AddTask("task-1", 1, (task, shared) => {
    shared.Set("foo", "hello");
    time.Sleep(1000);
    task.Notify("task-1 message");
  });

  const ts = new Date();
  plan.Start();
  console.log(`start: ${new Date().getTime() - ts.getTime()}`);

  time.Sleep(500);
  console.log(plan.Status());
  console.log(`500: ${new Date().getTime() - ts.getTime()}`);

  const p2 = new Plan("test-plan");

  time.Sleep(501);
  console.log(p2.Status());
  console.log(`501: ${new Date().getTime() - ts.getTime()}`);

  p2.Stop(); // stop the plan, clear the shared data
}
