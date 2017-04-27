const Users = require("./users");

class Homewatch {
  constructor(url, auth) {
    this.url = url;
    this.auth = auth;
  }

  get users() {
    return new Users(this);
  }
}

module.exports = Homewatch;
