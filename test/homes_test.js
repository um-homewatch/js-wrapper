const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("homes endpoint", () => {
  it("should list the user's homes", async () => {
    let homes = factories.buildList("home", 3);
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes")
      .reply(200, homes);

    let response = await homewatch.homes.listHomes();

    expect(response.data).to.deep.eq(homes);
  });

  it("should get a home", async () => {
    let home = factories.build("home");
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/homes/1")
      .reply(200, home);

    let response = await homewatch.homes.getHome(1);

    expect(response.data.name).to.eq(home.name);
    expect(response.data.tunnel).to.eq(home.tunnel);
    expect(response.data.location).to.eq(home.location);
  });

  it("should create a home", async () => {
    let home = factories.build("home");
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .post("/homes", { home })
      .reply(200, home);

    let response = await homewatch.homes.createHome(home);

    expect(response.data.name).to.eq(home.name);
    expect(response.data.tunnel).to.eq(home.tunnel);
    expect(response.data.location).to.eq(home.location);
  });

  it("should update a home", async () => {
    let home = factories.build("home");
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/homes/1", { home })
      .reply(200, home);

    let response = await homewatch.homes.updateHome(1, home);

    expect(response.data.name).to.eq(home.name);
    expect(response.data.tunnel).to.eq(home.tunnel);
    expect(response.data.location).to.eq(home.location);
  });


  it("should delete a home", async () => {
    homewatch.auth = "token";
    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .delete("/homes/1")
      .reply(204);

    let response = await homewatch.homes.deleteHome(1);

    expect(response.status).to.eq(204);
  });
});
