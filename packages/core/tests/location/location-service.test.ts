import assert from "node:assert";
import test from "node:test";

import {
  LocationService,
} from "../../src/index.js";

const location = {
  coordinate: {
    latitude: 10,
    longitude: 106,
  },
  accuracy: 5,
  timestamp: {
    unixMilliseconds: Date.now(),
  },
};

const provider = {
  start() {},
  stop() {},
  async getCurrentLocation() {
    return location;
  },
};

test("LocationService emits lifecycle events", () => {
  const service = new LocationService(provider);

  const events: string[] = [];

  service.onEvent((event) => {
    events.push(event);
  });

  service.start();
  service.update(location);
  service.stop();

  assert.deepEqual(events, [
    "started",
    "updated",
    "stopped",
  ]);
});
