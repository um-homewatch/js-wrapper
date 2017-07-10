/// <reference path="../index.d.ts" />

import { HomewatchApi } from ".."

const homewatch = new HomewatchApi("https://homewatch-api.herokuapp.com");

async function main() {
  const response = await homewatch.users.login({ email: "jose@mail.com", password: "1234" });

  console.log(response.data);
}

main();