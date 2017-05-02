const Users = require("./users");
const Homes = require("./homes");

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
}

module.exports = Homewatch;
