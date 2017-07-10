const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("scenarios endpoint", () => {
  homewatch.auth = "token";

  it("should list the home's scenarios", async () => {
    let scenarios = factories.buildList("scenario", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1/scenarios")
      .reply(200, scenarios);

    let response = await homewatch.scenarios({ id: 1 }).listScenarios();

    expect(response.data).to.deep.eq(scenarios);
  });

  it("should get a scenario", async () => {
    let scenario = factories.build("scenario");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/scenarios/2")
      .reply(200, scenario);

    let response = await homewatch.scenarios({ id: 1 }).getScenario(2);

    expect(response.data.name).to.eq(scenario.name);
  });

  it("should create a scenario", async () => {
    let scenario = factories.build("scenario");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/homes/1/scenarios", { scenario })
      .reply(200, scenario);

    let response = await homewatch.scenarios({ id: 1 }).createScenario(scenario);

    expect(response.data.name).to.eq(scenario.name);
  });

  it("should update a scenario", async () => {
    let scenario = factories.build("scenario");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/scenarios/2", { scenario })
      .reply(200, scenario);

    let response = await homewatch.scenarios({ id: 1 }).updateScenario(2, scenario);

    expect(response.data.name).to.eq(scenario.name);
  });


  it("should delete a scenario", async () => {
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/scenarios/2")
      .reply(204);

    let response = await homewatch.scenarios({ id: 1 }).deleteScenario(2);

    expect(response.status).to.eq(204);
  });
});
