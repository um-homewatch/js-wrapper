Homewatch = require("./api.js");

homewatch = new Homewatch("http://localhost:3000");

homewatch.users.register("José", "josesousa9000@gmail.com", "123456").
  then((result) => {
    console.log(result.data);
    let jwt = result.data.jwt;
    homewatch.auth = jwt;
    homewatch.users.currentUser().then((result) => console.log(result.data));
  }, (err) => {
    console.log(err.response.data); // Error: "It broke"
  });

