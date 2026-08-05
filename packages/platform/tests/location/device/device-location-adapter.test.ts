import assert from "node:assert";
import test from "node:test";

import {
  DeviceLocationAdapter,
} from "../../../src/location/device/device-location-adapter.js";


class TestDeviceLocationAdapter
  extends DeviceLocationAdapter {

  start(): void {}

  stop(): void {}

  push(location: any): void {
    this.updateLocation(location);
  }
}


test(
  "DeviceLocationAdapter stores latest location",
  () => {

    const adapter =
      new TestDeviceLocationAdapter();


    adapter.push({
      coordinate: {
        latitude: 10,
        longitude: 20,
      },
      timestamp: {
        unixMilliseconds: 1,
      },
    });


    assert.deepEqual(
      adapter.getCurrentLocation(),
      {
        coordinate: {
          latitude: 10,
          longitude: 20,
        },
        timestamp: {
          unixMilliseconds: 1,
        },
      },
    );
  },
);
