const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("scenario things endpoint", () => {
  const scenario = { id: 1 };
  homewatch.auth = "token";

  it("should list the scenario's things", async () => {
    let scenarioThings = factories.buildList("scenario_thing", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/scenarios/1/things")
      .reply(200, scenarioThings);

    let response = await homewatch.scenarioThings(scenario).listScenarioThings();

    expect(response.data).to.deep.eq(scenarioThings);
  });

  it("should get a scenario thing", async () => {
    let scenarioThing = factories.build("scenario_thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/scenarios/1/things/2")
      .reply(200, scenarioThing);

    let response = await homewatch.scenarioThings(scenario).getScenarioThing(2);

    expect(response.data.thing_id).to.eq(scenarioThing.thing_id);
    expect(response.data.status).to.deep.eq(scenarioThing.status);
  });

  it("should create a scenario thing", async () => {
    let scenarioThing = factories.build("scenario_thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/scenarios/1/things", { scenario_thing: scenarioThing })
      .reply(200, scenarioThing);

    let response = await homewatch.scenarioThings(scenario).createScenarioThing(scenarioThing);

    expect(response.data.thing_id).to.eq(scenarioThing.thing_id);
    expect(response.data.status).to.deep.eq(scenarioThing.status);
  });

  it("should update a scenario thing", async () => {
    let scenarioThing = factories.build("scenario_thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/scenarios/1/things/2", { scenario_thing: scenarioThing })
      .reply(200, scenarioThing);

    let response = await homewatch.scenarioThings(scenario).updateScenarioThing(2, scenarioThing);

    expect(response.data.thing_id).to.eq(scenarioThing.thing_id);
    expect(response.data.status).to.deep.eq(scenarioThing.status);
  });


  it("should apply a scenario thing", async () => {
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/scenarios/1/things/2")
      .reply(204);

    let response = await homewatch.scenarioThings(scenario).deleteScenarioThing(2);

    expect(response.status).to.eq(204);
  });
});
