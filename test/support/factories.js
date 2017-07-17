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

Factory.define("scenario")
  .attr("name", faker.lorem.word());

Factory.define("scenario_thing")
  .attr("thing_id", faker.random.number())
  .attr("status", { on: faker.random.boolean() });

Factory.define("timed_task")
  .attr("thing_id", faker.random.number())
  .attr("status", { on: faker.random.boolean() })
  .attr("cron", faker.lorem.word());

Factory.define("triggered_task")
  .attr("thing_id", faker.random.number())
  .attr("thing_to_compare_id", faker.random.number())
  .attr("comparator", "==")
  .attr("status_to_compare", { movement: faker.random.boolean() })
  .attr("status_to_apply", { locked: faker.random.boolean() });

Factory.define("tunnel")
  .attr("tunnel", faker.internet.url());

module.exports = Factory;
