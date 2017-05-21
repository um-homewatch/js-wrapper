class ThingStatus {
  constructor(axios, thing) {
    this.axios = axios;
    this.thing = thing;
  }

  /**
   * Gets the status of a thing
   * @return {Promise}
   */
  getStatus() {
    return this.axios.get(`/things/${this.thing.id}/status`);
  }

  /**
   * Sets the status of a thing
   * @param {Object} status
   * @return {Promise}
   */
  putStatus(status) {
    return this.axios.put(`/things/${this.thing.id}/status`, { status });
  }
}

module.exports = ThingStatus;
