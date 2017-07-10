// creating a scenario

const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000");
const jose = {
  name: "jose",
  email: "josesousa9000@gmail.com",
  password: "123456",
};

async function main() {
  // try and register the user, if it doesnt exist
  try {
    await homewatch.users.register(jose);
  } catch (err) {
    console.error(err);
    console.error(`CODE:${err.response.status} DATA:${JSON.stringify(err.response.data)}`);
  }

  try {
    // login
    let user = await homewatch.users.login(jose);
    homewatch.auth = user.data.jwt;

    // current user
    let currentUser = await homewatch.users.currentUser();
    console.log("Current user:");
    console.log(currentUser.data);

    // list user's homes
    let homes = await homewatch.homes.listHomes();

    // delete all homes
    let deleteTasks = homes.data.map(async (home) => await homewatch.homes.deleteHome(home.id));
    await Promise.all(deleteTasks);

    let home = await homewatch.homes.createHome({ name: "name", tunnel: "tunnel", location: "meme" });

    // create a scenario
    let scenario = await homewatch.scenarios(home.data).createScenario({ name: "Afternoon" });
    console.log(scenario.data);

    // reload home
    let newHome = await homewatch.homes.getHome(home.data.id);
    console.log("Reload home");
    console.log(newHome.data);

    // delete home
    let deletedHome = await homewatch.homes.deleteHome(home.data.id);
    console.log("Deleted home, status code:");
    console.log(deletedHome.status);
  } catch (err) {
    console.error(err);
    console.error(`CODE:${err.response.status} DATA:${JSON.stringify(err.response.data)}`);
  }
}

main();
