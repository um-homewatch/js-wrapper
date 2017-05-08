const axios = require("axios");

class Scenarios {
  constructor(baseApi, home) {
    this.baseApi = baseApi;
    this.axios = axios.create({
      baseURL: baseApi.url,
      timeout: 500,
      headers: { "Authorization": `Bearer ${baseApi.auth}` },
    });
    this.home = home;
  }

  /**
   * Returns the home's scenarios
   * @return {Promise}
   */
  listScenarios() {
    return this.axios.get(`/homes/${this.home.id}/scenarios`);
  }

  /**
   *  Gets a scecnario
   *  @param {number} id
   *  @return {Promise}
   */
  getScenario(id) {
    return this.axios.get(`/homes/${this.home.id}/scenarios/${id}`);
  }

  /**
    * Creates a home
    * @param {Object} scenario
    * @param {string} scenario.name
    * @return {Promise}
    */
  createScenario(scenario) {
    return this.axios.post(`/homes/${this.home.id}/scenarios`, { scenario });
  }

  /**
    * Creates a home
    * @param {number} id
    * @param {Object} scenario
    * @param {string} scenario.name
    * @return {Promise}
    */
  updateScenario(id, scenario) {
    return this.axios.put(`/homes/${this.home.id}/scenarios/${id}`, { scenario });
  }

  deleteScenario(id) {
    return this.axios.delete(`/homes/${this.home.id}/scenarios/${id}`);
  }
}

module.exports = Scenarios;
