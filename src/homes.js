const axios = require("axios");

class Homes {
  constructor(baseApi) {
    this.baseApi = baseApi;
    this.axios = axios.create({
      baseURL: baseApi.url,
      timeout: 500,
      headers: { "Authorization": `Bearer ${baseApi.auth}` },
    });
  }

  /**
   * Returns the user's home
   * @return {Promise}
   */
  listHomes() {
    return this.axios.get("/homes");
  }

  /**
   * Gets a home
   * @param {number} id
   * @return {Promise}
   */
  getHome(id) {
    return this.axios.get(`/homes/${id}`);
  }

  /**
    * Creates a home
    * @param {Object} home
    * @param {string} home.name
    * @param {string} home.tunnel
    * @param {string} home.location
    * @return {Promise}
    */
  createHome(home) {
    return this.axios.post("/homes", { home });
  }

  /**
    * Creates a home
    * @param {number} id
    * @param {Object} home
    * @param {string} home.name
    * @param {string} home.tunnel
    * @param {string} home.location
    * @return {Promise}
    */
  updateHome(id, home) {
    return this.axios.put(`/homes/${id}`, { home });
  }

  /**
   *  Deletes a home
   *  @param {number} id
   *  @return {Promise}
   */
  deleteHome(id) {
    return this.axios.delete(`/homes/${id}`);
  }
}

module.exports = Homes;
