const axios = require("axios");

class Things {
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
   * Returns the home's things
   * @return {Promise}
   */
  listThings() {
    return this.axios.get(`/homes/${this.home.id}/things`);
  }

  /**
   *  Gets a thing from a home
   *  @param {number} id
   *  @return {Promise}
   */
  getThing(id) {
    return this.axios.get(`/homes/${this.home.id}/things/${id}`);
  }

  /**
    * Creates a thing
    * @param {Object} thing
    * @param {string} thing.type
    * @param {string} thing.subtype
    * @param {Object} thing.connection_info
    * @return {Promise}
    */
  createThing(thing) {
    return this.axios.post(`/homes/${this.home.id}/things`, { thing });
  }

  /**
    * Updates a thing
    * @param {number} id
    * @param {Object} thing
    * @param {string} thing.type
    * @param {string} thing.subtype
    * @param {Object} thing.connection_info
    * @return {Promise}
    */
  updateThing(id, thing) {
    return this.axios.put(`/homes/${this.home.id}/things/${id}`, { thing });
  }

  deleteThing(id) {
    return this.axios.delete(`/homes/${this.home.id}/things/${id}`);
  }
}

module.exports = Things;
