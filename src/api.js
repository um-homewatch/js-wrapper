const Users = require("./users");
const Homes = require("./homes");
const Things = require("./things");
const ThingStatus = require("./things/status");
const Scenarios = require("./scenarios");
const ScenarioThings = require("./scenario_things");

class Homewatch {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }

  get users() {
    return new Users(this);
  }

  /**
   * @return {Homes}
   */
  get homes() {
    return new Homes(this);
  }

  /**
    * Access the things module
    * @param {Object} home
    * @return {Things}
    */
  things(home) {
    return new Things(this, home);
  }

  /**
    * Access the thing status module
    * @param {Object} thing
    * @return {Things}
    */
  status(thing) {
    return new ThingStatus(this, thing);
  }

  /**
    * Access the scenarios module
    * @param {Object} home
    * @return {Scenarios}
    */
  scenarios(home) {
    return new Scenarios(this, home);
  }

  /**
    * Access the scenario things module
    * @param {Object} scenario
    * @return {ScenarioThings}
    */
  scenarioThings(scenario) {
    return new ScenarioThings(this, scenario);
  }
}

module.exports = Homewatch;
