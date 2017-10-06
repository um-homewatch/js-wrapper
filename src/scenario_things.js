class ScenarioThings {
  constructor(axios, scenario) {
    this.axios = axios;
    this.scenario = scenario;
  }

  /**
  * Returns the scenario's things
  * @return {Promise}
  */
  listScenarioThings() {
    return this.axios.get(`/scenarios/${this.scenario.id}/things`);
  }

  /**
   * Gets a thing from a home
   * @param {number} id
   * @return {Promise}
   */
  getScenarioThing(id) {
    return this.axios.get(`/scenarios/${this.scenario.id}/things/${id}`);
  }

  /**
    * Adds thing to scenario
    * @param {Object} thing
    * @param {string} thing.thing_id
    * @param {Object} thing.status
    * @return {Promise}
    */
  createScenarioThing(thing) {
    return this.axios.post(`/scenarios/${this.scenario.id}/things`, { scenario_thing: thing });
  }

  /**
    * Updates a scenario thing
    * @param {number} id
    * @param {Object} thing
    * @param {string} thing.thing_id
    * @param {Object} thing.status
    * @return {Promise}
    */
  updateScenarioThing(id, thing) {
    return this.axios.put(`/scenarios/${this.scenario.id}/things/${id}`, { scenario_thing: thing });
  }

  /**
   *  Deletes a thing from a scenario
   *  @param {number} id
   *  @return {Promise}
   */
  deleteScenarioThing(id) {
    return this.axios.delete(`/scenarios/${this.scenario.id}/things/${id}`);
  }
}

module.exports = ScenarioThings;
