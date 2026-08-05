import assert from "node:assert";
import test from "node:test";

import {
  LocationService,
  LocationTracker,
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

test("LocationTracker receives location updates", () => {
  const service = new LocationService(provider);

  const tracker = new LocationTracker(service);

  tracker.start();

  service.update(location);

  const current =
    tracker.getCurrentLocation();

  assert.deepEqual(
    current,
    location,
  );

  tracker.stop();
});
