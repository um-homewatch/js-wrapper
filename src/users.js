class Users {
  constructor(axios) {
    this.axios = axios;
  }

  /**
    * Registers a user
    * @param {Object} user
    * @param {string} user.name
    * @param {string} user.email
    * @param {string} user.password
    * @return {Promise}
    */
  register(user) {
    return this.axios.post("/users", { user });
  };

  /**
    * Authenticates a user
    * @param {Object} auth
    * @param {string} auth.email
    * @param {string} auth.password
    * @return {Promise}
    */
  login(auth) {
    return this.axios.post("/auth", { auth });
  }

  /**
    * Returns the currently logged user
    * @return {Promise}
    */
  currentUser() {
    return this.axios.get("/users/me");
  }

  /**
    * Updates the currently logged user
    * @param {Object} user
    * @param {string} user.name
    * @param {string} user.email
    * @param {string} user.password
    * @return {Promise}
    */
  updateCurrentUser(user) {
    return this.axios.put("/users/me", { user });
  }
}

module.exports = Users;

