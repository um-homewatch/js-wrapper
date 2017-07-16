const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000", true);
const cache = require("memory-cache");

describe("caching", function() {
  it("should cache get requests", async () => {
    homewatch.auth = "token";
    let user = factories.build("user");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/users/me")
      .reply(200, user);

    await homewatch.users.currentUser();
    nock.cleanAll();
    let response = await homewatch.users.currentUser();
    let cachedResponse = await cache.get("/users/me");

    expect(cachedResponse).to.deep.eq(response);
    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
  });

  it("should clear cache on non-get requests", async () => {
    homewatch.auth = "token";
    let user = factories.build("user");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/users/me")
      .reply(200, user);

    let response = await homewatch.users.currentUser();

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/users/me", { user })
      .reply(200, user);

    await homewatch.users.updateCurrentUser(user);

    expect(cache.size()).to.eq(0);
  });
});
