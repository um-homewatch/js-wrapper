const expect = require("chai").expect;
const faker = require("faker");
const Homewatch = require("../src/api");
const homewatch = new Homewatch("http://localhost:3000");

describe("Array", function() {
  describe("user registration", function() {
    it("should register a user", function(done) {
      user = generateUser();
      homewatch.users.register(user.name, user.email, user.password)
        .then((response) => {
          expect(response.data.name).to.eq(user.name);
          expect(response.data.email).to.eq(user.email);
          done();
        }, (error) => {
          done(error.response.data);
        })
        .catch((err) => done(err));
    });
  });

  describe("user self methods", () => {
    let USER;

    beforeEach((done) => {
      USER = generateUser();
      homewatch.users.register(USER.name, USER.email, USER.password)
        .then((response) => {
          USER = response.data;
          done();
        }, (error) => {
          done(error.response.data);
        })
        .catch((err) => done(err));
    });

    it("should login a user", (done) => {
      homewatch.users.login(user.email, user.password)
        .then((response) => {
          expect(response.data.jwt).to.exist;
          done();
        }, (error) => {
          done(error.response.data);
        })
        .catch((err) => done(err));
    });

    it("should update a user", (done) => {
      homewatch.auth = USER.jwt;
      user = generateUser();
      homewatch.users.updateCurrentUser(user.name, user.email, user.password)
        .then((response) => {
          expect(response.data.name).to.eq(user.name);
          expect(response.data.email).to.eq(user.email);
          done();
        }, (error) => {
          done(error.response.data);
        })
        .catch((err) => done(err));
    });

    it("should return the user data", (done) => {
      homewatch.auth = USER.jwt;
      homewatch.users.currentUser()
        .then((response) => {
          expect(response.data.name).to.eq(USER.name);
          expect(response.data.email).to.eq(USER.email);
          done();
        }, (error) => {
          done(error.response.data);
        })
        .catch((err) => done(err));
    });
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
