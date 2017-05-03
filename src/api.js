const Users = require("./users");
const Homes = require("./homes");
const Things = require("./things");

class Homewatch {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }

  get users() {
    return new Users(this);
  }

  /**
   * @return {Homes}
   */
  get homes() {
    return new Homes(this);
  }

  /**
    * Access the things module
    * @param {Object} home
    * @return {Things}
    */
  things(home) {
    return new Things(this, home);
  }
}

module.exports = Homewatch;
