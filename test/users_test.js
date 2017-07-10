const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");

describe("users endpoint", function() {
  it("should register a user", async () => {
    let user = factories.build("user");

    nock("http://localhost:3000")
      .post("/users", { user })
      .reply(200, {
        name: user.name,
        email: user.email,
        jwt: "token",
      });

    let response = await homewatch.users.register(user);
    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
    expect(response.data.jwt).to.eq("token");
  });

  it("should login a user", async () => {
    let user = factories.build("user");

    nock("http://localhost:3000")
      .post("/auth", { auth: { email: user.email, password: user.password } })
      .reply(200, { jwt: "token" });

    let response = await homewatch.users.login(user);

    expect(response.data.jwt).to.exist;
  });

  it("should update a user", async () => {
    let user = factories.build("user");
    homewatch.auth = "token";

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .put("/users/me", { user })
      .reply(200, user);

    let response = await homewatch.users.updateCurrentUser(user);

    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
  });

  it("should return the user data", async () => {
    homewatch.auth = "token";
    let user = factories.build("user");

    nock("http://localhost:3000", { reqheaders: { "authorization": "Bearer token" } })
      .get("/users/me")
      .reply(200, user);

    let response = await homewatch.users.currentUser();

    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
  });
});
