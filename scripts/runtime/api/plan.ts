import { Plan, time } from "@yao/runtime";

function Test() {
  const namespace = "scripts.runtime.api.plan";

  const plan = new Plan("test-plan");
  plan.Subscribe("TaskStarted", `${namespace}.TaskStarted`, "foo");
  plan.Subscribe("TaskCompleted", `${namespace}.TaskCompleted`, "foo");
  plan.Subscribe("some-key", `${namespace}.SomeKey`, "bar");

  plan.Add("task-1", 1, `${namespace}.Task1`, "foo1");
  plan.Add("task-2", 1, `${namespace}.Task2`, "foo2");
  plan.Add("task-3", 2, `${namespace}.Task3`, "foo3");
  plan.Add("task-4", 2, `${namespace}.Task4`, "foo4");
  plan.Run();
  plan.Release();
  return "Done";
}

function Task1(plan_id: string, task_id: string, foo: string) {
  const plan = new Plan(plan_id);
  plan.Set("some-key", `foo-${foo}`);
  time.Sleep(200);
  const ts = new Date().getTime();
  return ts;
}

function Task2(plan_id: string, task_id: string, foo: string) {
  time.Sleep(300);
  const ts = new Date().getTime();
  return ts;
}

function Task3(plan_id: string, task_id: string, foo: string) {
  const plan = new Plan(plan_id);
  const some = plan.Get("some-key");

  // Update the shared data
  plan.Set("some-key", `bar-${foo}`);
  time.Sleep(400);
  const ts = new Date().getTime();
  return { ts: ts, shared: some };
}

function Task4(plan_id: string, task_id: string, foo: string) {
  const plan = new Plan(plan_id);
  time.Sleep(500);
  const some = plan.Get("some-key");
  const ts = new Date().getTime();
  return { ts: ts, shared: some };
}

function SomeKey(plan_id: string, key: string, data: any, foo: string) {
  const plan = new Plan(plan_id);
  const ts = new Date().getTime();
  console.log(`SomeKey ${plan_id} ${key} ${JSON.stringify(data)} ${foo} ${ts}`);
  console.log(plan.Status());
}

function TaskStarted(plan_id: string, key: string, data: any, foo: string) {
  const ts = new Date().getTime();
  console.log(
    `TaskStarted ${plan_id} ${key} ${JSON.stringify(data)} ${foo} ${ts}`
  );
}

function TaskCompleted(plan_id: string, key: string, data: any, foo: string) {
  const ts = new Date().getTime();
  console.log(
    `TaskCompleted ${plan_id} ${key} ${JSON.stringify(data)} ${foo} ${ts}`
  );
}
