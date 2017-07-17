const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("triggered tasks endpoint", () => {
  homewatch.auth = "token";

  it("should list the home's triggeredTasks", async () => {
    let triggeredTasks = factories.buildList("triggered_task", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1/tasks/triggered")
      .reply(200, triggeredTasks);

    let response = await homewatch.triggeredTasks({ id: 1 }).listTriggeredTasks();

    expect(response.data).to.deep.eq(triggeredTasks);
  });

  it("should get a triggeredTask", async () => {
    let triggeredTask = factories.build("triggered_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/tasks/triggered/2")
      .reply(200, triggeredTask);

    let response = await homewatch.triggeredTasks({ id: 1 }).getTriggeredTask(2);

    expect(response.data.thing_id).to.eq(triggeredTask.thing_id);
    expect(response.data.thing_to_compare_id).to.deep.eq(triggeredTask.thing_to_compare_id);
    expect(response.data.comparator).to.eq(triggeredTask.comparator);
    expect(response.data.status_to_compare).to.deep.eq(triggeredTask.status_to_compare);
    expect(response.data.status_to_apply).to.deep.eq(triggeredTask.status_to_apply);
  });

  it("should create a triggeredTask", async () => {
    let triggeredTask = factories.build("triggered_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/homes/1/tasks/triggered", { triggered_task: triggeredTask })
      .reply(200, triggeredTask);

    let response = await homewatch.triggeredTasks({ id: 1 }).createTriggeredTask(triggeredTask);

    expect(response.data.thing_id).to.eq(triggeredTask.thing_id);
    expect(response.data.thing_to_compare_id).to.deep.eq(triggeredTask.thing_to_compare_id);
    expect(response.data.comparator).to.eq(triggeredTask.comparator);
    expect(response.data.status_to_compare).to.deep.eq(triggeredTask.status_to_compare);
    expect(response.data.status_to_apply).to.deep.eq(triggeredTask.status_to_apply); ;
  });

  it("should update a triggeredTask", async () => {
    let triggeredTask = factories.build("triggered_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/tasks/triggered/2", { triggered_task: triggeredTask })
      .reply(200, triggeredTask);

    let response = await homewatch.triggeredTasks({ id: 1 }).updateTriggeredTask(2, triggeredTask);

    expect(response.data.thing_id).to.eq(triggeredTask.thing_id);
    expect(response.data.thing_to_compare_id).to.deep.eq(triggeredTask.thing_to_compare_id);
    expect(response.data.comparator).to.eq(triggeredTask.comparator);
    expect(response.data.status_to_compare).to.deep.eq(triggeredTask.status_to_compare);
    expect(response.data.status_to_apply).to.deep.eq(triggeredTask.status_to_apply);
  });


  it("should delete a triggeredTask", async () => {
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/tasks/triggered/2")
      .reply(204);

    let response = await homewatch.triggeredTasks({ id: 1 }).deleteTriggeredTask(2);

    expect(response.status).to.eq(204);
  });
});
