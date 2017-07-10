const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("timed tasks endpoint", () => {
  homewatch.auth = "token";

  it("should list the home's timedTasks", async () => {
    let timedTasks = factories.buildList("timed_task", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1/tasks/timed")
      .reply(200, timedTasks);

    let response = await homewatch.timedTasks({ id: 1 }).listTimedTasks();

    expect(response.data).to.deep.eq(timedTasks);
  });

  it("should get a timedTask", async () => {
    let timedTask = factories.build("timed_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/tasks/timed/2")
      .reply(200, timedTask);

    let response = await homewatch.timedTasks({ id: 1 }).getTimedTask(2);

    expect(response.data.thing_id).to.eq(timedTask.thing_id);
    expect(response.data.status).to.deep.eq(timedTask.status);
    expect(response.data.cron).to.eq(timedTask.cron);
  });

  it("should create a timedTask", async () => {
    let timedTask = factories.build("timed_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/homes/1/tasks/timed", { timed_task: timedTask })
      .reply(200, timedTask);

    let response = await homewatch.timedTasks({ id: 1 }).createTimedTask(timedTask);

    expect(response.data.thing_id).to.eq(timedTask.thing_id);
    expect(response.data.status).to.deep.eq(timedTask.status);
    expect(response.data.cron).to.eq(timedTask.cron);
  });

  it("should update a timedTask", async () => {
    let timedTask = factories.build("timed_task");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/tasks/timed/2", { timed_task: timedTask })
      .reply(200, timedTask);

    let response = await homewatch.timedTasks({ id: 1 }).updateTimedTask(2, timedTask);

    expect(response.data.thing_id).to.eq(timedTask.thing_id);
    expect(response.data.status).to.deep.eq(timedTask.status);
    expect(response.data.cron).to.eq(timedTask.cron);
  });


  it("should delete a timedTask", async () => {
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/tasks/timed/2")
      .reply(204);

    let response = await homewatch.timedTasks({ id: 1 }).deleteTimedTask(2);

    expect(response.status).to.eq(204);
  });
});
