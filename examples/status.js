// this script represents a full integration with a philips hue type bulb, and interacts with it

const Homewatch = require("../src/api");
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

    // update home
    await homewatch.homes.updateHome(home.data.id, { name: "name1", tunnel: "http://192.168.1.200:4567", location: "meme1" });
    let newHome = await homewatch.homes.getHome(home.data.id);
    console.log("Updated Home");
    console.log(newHome.data);

    // discover hue devices
    let hueDevices = await homewatch.things(newHome.data).discoverThings({ type: "Things::Light", subtype: "hue", port: 8000 });
    console.log("Discover devices:");
    console.log(hueDevices.data);

    // add things to home
    let thing = await homewatch.things(newHome.data).createThing({ type: "Things::Light", subtype: "hue", connection_info: { address: "192.168.1.9", port: "8000", light_id: 1 } });
    console.log("Thing");
    console.log(thing.data);

    // get thing status
    let status = await homewatch.status(thing.data).getStatus();
    console.log("Thing status");
    console.log(status.data);

    // invert thing status
    status.data.on = !status.data.on;
    status = await homewatch.status(thing.data).putStatus(status.data);

    // reload home
    newHome = await homewatch.homes.getHome(newHome.data.id);
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
