class Things {
  constructor(axios, home) {
    this.axios = axios;
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
   * Discover devices in the user's network
   * @param {Object} discoveryParams
   * @param {string} discoveryParams.type
   * @param {string} discoveryParams.subtype
   * @param {number} discoveryParams.port
   * @return {Promise}
   */
  discoverThings(discoveryParams) {
    return this.axios.get(`/homes/${this.home.id}/things/discovery`, { params: discoveryParams });
  }

  /**
   * Gets a thing from a home
   * @param {number} id
   * @return {Promise}
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

  /**
    * Deletes a thing
    * @param {number} id
    * @return {Promise}
    */
  deleteThing(id) {
    return this.axios.delete(`/homes/${this.home.id}/things/${id}`);
  }
}

module.exports = Things;
