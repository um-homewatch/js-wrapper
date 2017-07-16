const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("scenario things endpoint", () => {
  const scenario = { id: 1 };
  homewatch.auth = "token";

  it("should apply a scenario", async () => {
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/scenarios/1/apply")
      .reply(200);

    let response = await homewatch.scenarioApplier(scenario).applyScenario();

    expect(response.status).to.eq(200);
  });
});
