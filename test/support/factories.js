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

Factory.define("thing")
  .attr("type", faker.lorem.word())
  .attr("subtype", faker.lorem.word())
  .attr("connection_info", { address: faker.internet.ip() });

Factory.define("light_status")
  .attr("on", faker.random.boolean());

module.exports = Factory;
