class ScenarioApplier {
  constructor(axios, scenario) {
    this.axios = axios;
    this.scenario = scenario;
  }

  /**
  * Applies a scenario
  * @return {Promise}
  */
  applyScenario() {
    return this.axios.post(`/scenarios/${this.scenario.id}/apply`);
  }
}

module.exports = ScenarioApplier;
