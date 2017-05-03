const Homewatch = require("../src/api");
const homewatch = new Homewatch("http://localhost:3000");

async function main() {
  // try and register the user, if it doesnt exist
  try {
    await homewatch.users.register("jose", "josesousa9000@gmail.com", "123456");
  } catch (err) {
    console.error(`CODE:${err.response.status} DATA:${JSON.stringify(err.response.data)}`);
  }

  try {
    // login
    let user = await homewatch.users.login("josesousa9000@gmail.com", "123456");
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

    // update home
    await homewatch.homes.updateHome(home.data.id, { name: "name1", tunnel: "http://localhost:4567", location: "meme1" });
    let newHome = await homewatch.homes.getHome(home.data.id);
    console.log("Updated Home");
    console.log(newHome.data);

    // add things to home
    let thing = await homewatch.things(newHome.data).createThing({ type: "Things::Light", subtype: "hue", connection_info: { address: "localhost", port: "8000" } });
    console.log("Thing");
    console.log(thing.data);

    // reload home
    newHome = await homewatch.homes.getHome(newHome.data.id);
    console.log("Reload home");
    console.log(newHome.data);

    // delete home
    // let deletedHome = await homewatch.homes.deleteHome(home.data.id);
    // console.log("Deleted home, status code:");
    // console.log(deletedHome.status);
  } catch (err) {
    console.error(err);
    console.error(`CODE:${err.response.status} DATA:${JSON.stringify(err.response.data)}`);
  }
}

main();
