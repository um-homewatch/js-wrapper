const expect = require("chai").expect;
const faker = require("faker");
const Homewatch = require("../src/api");
const homewatch = new Homewatch("http://localhost:3000");

describe("users endpoint", function() {
  let USER;

  it("should register a user", async () => {
    user = generateUser();

    let response = await homewatch.users.register(user.name, user.email, user.password);
    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
  });


  beforeEach(async () => {
    let user = generateUser();
    let response = await homewatch.users.register(user.name, user.email, user.password);
    USER = response.data;
  });

  it("should login a user", async () => {
    let response = await homewatch.users.login(user.email, user.password);

    expect(response.data.jwt).to.exist;
  });

  it("should update a user", async () => {
    homewatch.auth = USER.jwt;
    user = generateUser();
    let response = await homewatch.users.updateCurrentUser(user.name, user.email, user.password);

    expect(response.data.name).to.eq(user.name);
    expect(response.data.email).to.eq(user.email);
  });

  it("should return the user data", async () => {
    homewatch.auth = USER.jwt;
    let response = await homewatch.users.currentUser();

    expect(response.data.name).to.eq(USER.name);
    expect(response.data.email).to.eq(USER.email);
  });
});

function generateUser() {
  name = faker.name.findName();
  return {
    name: name,
    email: faker.internet.email(name),
    password: "foobar",
  };
}
