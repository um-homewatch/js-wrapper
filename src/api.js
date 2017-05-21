const axios = require("axios");
const Users = require("./users");
const Homes = require("./homes");
const Things = require("./things");
const ThingStatus = require("./thing_status");
const Scenarios = require("./scenarios");
const ScenarioThings = require("./scenario_things");

class Homewatch {
  constructor(url) {
    axios.defaults.baseURL = url;
    this.axios = axios.default;
  }

  set auth(auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth}`;
  }

  /**
   * @return {Users}
   */
  get users() {
    return new Users(this.axios);
  }

  /**
   * @return {Homes}
   */
  get homes() {
    return new Homes(this.axios);
  }

  /**
    * Access the things module
    * @param {Object} home
    * @return {Things}
    */
  things(home) {
    return new Things(this.axios, home);
  }

  /**
    * Access the thing status module
    * @param {Object} thing
    * @return {Things}
    */
  status(thing) {
    return new ThingStatus(this.axios, thing);
  }

  /**
    * Access the scenarios module
    * @param {Object} home
    * @return {Scenarios}
    */
  scenarios(home) {
    return new Scenarios(this.axios, home);
  }

  /**
    * Access the scenario things module
    * @param {Object} scenario
    * @return {ScenarioThings}
    */
  scenarioThings(scenario) {
    return new ScenarioThings(this.axios, scenario);
  }
}

module.exports = Homewatch;
