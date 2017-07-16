const expect = require("chai").expect;
const factories = require("./support/factories");
const nock = require("nock");
const Homewatch = require("../src/api").HomewatchApi;
const homewatch = new Homewatch("http://localhost:3000", true);
const cache = require("memory-cache");

describe("hub discovery", function () {
  it("should discover hub on lan", async () => {
    let tunnel = factories.build("tunnel");

    nock("http://homewatch-hub.local:4567/")
      .get("/tunnel")
      .reply(200, tunnel);

    let response = await homewatch.hub.getTunnel();

    expect(response.data.tunnel).to.eq(tunnel.tunnel);
  });
});
