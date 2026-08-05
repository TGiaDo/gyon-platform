import assert from "node:assert";
import test from "node:test";

import {
  DeviceLocationAdapter,
} from "../../../src/location/device/device-location-adapter.js";

import {
  LocationServiceBinding,
} from "../../../src/location/binding/location-service-binding.js";



class TestAdapter
  extends DeviceLocationAdapter {

  start(): void {}

  stop(): void {}


  push(location: any): void {
    this.updateLocation(
      location,
    );
  }
}



test(
  "LocationServiceBinding forwards location updates",
  () => {

    const adapter =
      new TestAdapter();


    let received =
      null;


    const service = {

      update(location: any) {
        received = location;
      },

    } as any;



    const binding =
      new LocationServiceBinding(
        adapter,
        service,
      );


    binding.start();



    const location = {

      coordinate: {
        latitude: 10,
        longitude: 20,
      },

      timestamp: {
        unixMilliseconds: 100,
      },

    };


    adapter.push(
      location,
    );


    assert.deepEqual(
      received,
      location,
    );

  },
);
