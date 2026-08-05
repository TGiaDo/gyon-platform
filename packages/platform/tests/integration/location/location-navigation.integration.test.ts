import assert from "node:assert";
import test from "node:test";

import {
  HuaweiLocationAdapter,
} from "../../../src/location/huawei/huawei-location-adapter.js";

import {
  LocationServiceBinding,
} from "../../../src/location/binding/location-service-binding.js";


test(
  "location updates flow through platform binding",
  () => {

    let locationListener:
      (
        location: any,
      ) => void;


    const sensor = {

      start(
        listener:
          (
            location: any,
          ) => void,
      ) {

        locationListener =
          listener;

      },


      stop() {},

    };


    const adapter =
      new HuaweiLocationAdapter(
        sensor,
      );


    let received = false;


    const consumer = {

      update() {

        received = true;

      },

    };


    const binding =
      new LocationServiceBinding(
        adapter,
        consumer,
      );


    binding.start();


    adapter.start();


    locationListener({
      latitude: 10,
      longitude: 106,
      accuracy: 5,
      timestamp: Date.now(),
    });


    assert.equal(
      received,
      true,
    );


    binding.stop();

    adapter.stop();

  },
);
