const Factory = require("rosie").Factory;
const faker = require("faker");

Factory.define("user")
  .attr("name", faker.name.findName())
  .attr("email", faker.internet.email())
  .attr("password", "foobar");

Factory.define("home")
  .attr("name", faker.name.findName())
  .attr("tunnel", faker.internet.url())
  .attr("location", faker.address.streetAddress());

module.exports = Factory;
