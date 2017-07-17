const axios = require("axios");
const Users = require("./users");
const Homes = require("./homes");
const Things = require("./things");
const ThingStatus = require("./thing_status");
const Scenarios = require("./scenarios");
const ScenarioThings = require("./scenario_things");
const ScenarioApplier = require("./scenario_applier");
const Hub = require("./hub");
const TimedTasks = require("./timed_tasks");
const TriggeredTasks = require("./triggered_tasks");
const cache = require("memory-cache");

class HomewatchApi {
  constructor(url, cache) {
    axios.defaults.baseURL = url;
    this.axios = axios.default;
    if (cache === true) {
      this.axios.get = getFromCache(this.axios.get);
      this.axios.interceptors.response.use(cacheClear);
    }
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

  /**
    * Access the scenario things module
    * @param {Object} scenario
    * @return {ScenarioThings}
    */
  scenarioApplier(scenario) {
    return new ScenarioApplier(this.axios, scenario);
  }

  /**
   * Access the timed tasks module
   * @param {Object} home
   * @return {ScenarioThings}
   */
  timedTasks(home) {
    return new TimedTasks(this.axios, home);
  }

  /**
   * Access the timed tasks module
   * @param {Object} home
   * @return {ScenarioThings}
   */
  triggeredTasks(home) {
    return new TriggeredTasks(this.axios, home);
  }

  /**
   * Access the hub module
   * @return {Hub}
   */
  get hub() {
    let axiosInstance = axios.create({
      baseURL: "http://homewatch-hub.local:4567/",
      timeout: 1000,
    });
    return new Hub(axiosInstance);
  }
}

function getFromCache(get) {
  return function cachedGet(url) {
    const value = cache.get(url);

    if (value) {
      return value;
    } else {
      const request = get(...arguments);
      cache.put(url, request, 30000);
      return request;
    }
  };
}

function cacheClear(response) {
  if (response.config.method != "get") cache.clear();
  return response;
}

module.exports.HomewatchApi = HomewatchApi;
