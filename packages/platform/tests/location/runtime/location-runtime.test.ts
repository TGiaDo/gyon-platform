import assert from "node:assert";
import test from "node:test";

import {
  LocationRuntime,
} from "../../../src/index.js";

import {
  SimulatorLocationAdapter,
} from "../../../src/index.js";


const location = {
  latitude: 10.762622,
  longitude: 106.660172,
  accuracy: 5,
  timestamp: Date.now(),
};



test(
  "LocationRuntime exposes current location",
  () => {

    const adapter =
      new SimulatorLocationAdapter(
        location,
      );


    const runtime =
      new LocationRuntime(
        adapter,
      );


    assert.deepEqual(
      runtime.getCurrentLocation(),
      location,
    );

  },
);



test(
  "LocationRuntime controls adapter lifecycle",
  () => {


    let started =
      false;

    let stopped =
      false;



    const adapter = {

      getCurrentLocation() {
        return location;
      },


      start() {
        started = true;
      },


      stop() {
        stopped = true;
      },

    };



    const runtime =
      new LocationRuntime(
        adapter,
      );



    runtime.start();


    assert.equal(
      started,
      true,
    );



    runtime.stop();


    assert.equal(
      stopped,
      true,
    );

  },
);
