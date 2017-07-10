const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("things endpoint", () => {
  const home = { id: 1 };
  homewatch.auth = "token";

  it("should list the home's things", async () => {
    let things = factories.buildList("thing", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1/things")
      .reply(200, things);

    let response = await homewatch.things(home).listThings();

    expect(response.data).to.deep.eq(things);
  });

  it("should request a discovery of things in a home", async () => {
    let discoveryParams = { type: "Things::Light", subtype: "hue", port: "8000" };
    let things = factories.buildList("thing", 3);

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1/things/discovery")
      .query(discoveryParams)
      .reply(200, things);

    let response = await homewatch.things(home).discoverThings(discoveryParams);

    expect(response.data).to.deep.eq(things);
  });

  it("should get a thing", async () => {
    let thing = factories.build("thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/things/2")
      .reply(200, thing);

    let response = await homewatch.things(home).getThing(2);

    expect(response.data.type).to.eq(thing.type);
    expect(response.data.subtype).to.eq(thing.subtype);
    expect(response.data.connection_info).to.deep.eq(thing.connection_info); ;
  });

  it("should create a thing", async () => {
    let thing = factories.build("thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/homes/1/things", { thing })
      .reply(200, thing);

    let response = await homewatch.things(home).createThing(thing);

    expect(response.data.type).to.eq(thing.type);
    expect(response.data.subtype).to.eq(thing.subtype);
    expect(response.data.connection_info).to.deep.eq(thing.connection_info);
  });

  it("should update a thing", async () => {
    let thing = factories.build("thing");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/things/2", { thing })
      .reply(200, thing);

    let response = await homewatch.things(home).updateThing(2, thing);

    expect(response.data.type).to.eq(thing.type);
    expect(response.data.subtype).to.eq(thing.subtype);
    expect(response.data.connection_info).to.deep.eq(thing.connection_info);
  });


  it("should delete a thing", async () => {
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/things/2")
      .reply(204);

    let response = await homewatch.things(home).deleteThing(2);

    expect(response.status).to.eq(204);
  });
});
