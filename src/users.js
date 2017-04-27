const axios = require("axios");

class Users {
  constructor(baseApi) {
    this.baseApi = baseApi;
    this.axios = axios.create({
      baseURL: baseApi.url,
      timeout: 500,
      headers: { "Authorization": `Bearer ${baseApi.auth}` },
    });
  }

  register(name, email, password) {
    let data = {
      user: {
        name,
        email,
        password,
      },
    };

    return this.axios.post("/users", data);
  };

  login(email, password) {
    let data = {
      auth: {
        email,
        password,
      },
    };

    return this.axios.post("/auth", data);
  }

  currentUser() {
    return this.axios.get("/users/me");
  }

  updateCurrentUser(name, email, password) {
    let data = {
      user: {
        name,
        email,
        password,
      },
    };

    return this.axios.put("/users/me", data);
  }
}

module.exports = Users;

