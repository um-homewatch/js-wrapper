Homewatch = require("./api.js");

homewatch = new Homewatch("http://localhost:3000");

async function main() {
  try {
    let user = await homewatch.users.register("José", "josesousa9000@gmail.com", "123456")
    homewatch.auth = user.data.jwt;
    let currentUser = await homewatch.users.currentUser()
    console.log(currentUser.data);
  } catch (err) {
    console.error(err);
  }
}

main();