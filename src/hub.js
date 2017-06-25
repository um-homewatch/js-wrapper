class Hub {
  constructor(axios) {
    this.axios = axios;
  }

  /**
   * Creates a home
   * @return {Promise}
   */
  getTunnel() {
    return this.axios.get("/tunnel");
  }
}

module.exports = Hub;
