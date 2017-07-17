/// <reference path="../index.d.ts" />

import { HomewatchApi } from ".."

const homewatch = new HomewatchApi("https://homewatch-api.herokuapp.com");

async function main() {
  try {
    let response = await homewatch.users.login({ email: "jose@mail.com", password: "1234" });

    console.log(response.data);

    homewatch.auth = response.data.jwt;

    response = await homewatch.homes.listHomes();

    let home = { id: response.data[0].id }

    console.log(response.data[0]);

    response = await homewatch.timedTasks(home).listTimedTasks();

    console.log(response.data);

    response = await homewatch.triggeredTasks(home).listTriggeredTasks();

    console.log(response.data);
  }
  catch (error) {
    console.trace(error);
  }
}

main();