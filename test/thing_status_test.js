const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("thing status endpoint", () => {
  const thing = { id: 1 };
  homewatch.auth = "token";

  it("should get a thing status", async () => {
    let status = factories.build("light_status");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/things/1/status")
      .reply(200, status);

    let response = await homewatch.status(thing).getStatus();

    expect(response.data.on).to.eq(status.on);
  });

  it("should update a home", async () => {
    let status = factories.build("light_status");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/things/1/status", { status })
      .reply(200, status);

    let response = await homewatch.status(thing).putStatus(status);

    expect(response.data.on).to.eq(status.on);
  });
});
