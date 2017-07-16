/// <reference path="../index.d.ts" />

import { HomewatchApi } from ".."

const homewatch = new HomewatchApi("https://homewatch-api.herokuapp.com");

async function main() {
  try {
    let response = await homewatch.users.login({ email: "jose@mail.com", password: "1234" });

    console.log(response.data);

    homewatch.auth = response.data.jwt;

    response = await homewatch.homes.listHomes();

    console.log(response.data[0]);

    response = await homewatch.timedTasks({ id: response.data[0].id }).listTimedTasks();

    console.log(response.data);
  }
  catch (error) {
    console.trace(error);
  }
}

main();