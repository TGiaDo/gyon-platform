import assert from "node:assert";
import test from "node:test";

import {
  SimulatorLocationAdapter,
} from "../../src/location/index.js";


test(
  "SimulatorLocationAdapter returns initial location",
  () => {

    const location = {
      latitude: 10,
      longitude: 106,
      accuracy: 5,
      timestamp: 1000,
    };


    const adapter =
      new SimulatorLocationAdapter(
        location,
      );


    assert.deepEqual(
      adapter.getCurrentLocation(),
      location,
    );
  },
);


test(
  "SimulatorLocationAdapter updates location",
  () => {

    const adapter =
      new SimulatorLocationAdapter();


    const nextLocation = {
      latitude: 11,
      longitude: 107,
      accuracy: 3,
      timestamp: 2000,
    };


    adapter.update(
      nextLocation,
    );


    assert.deepEqual(
      adapter.getCurrentLocation(),
      nextLocation,
    );
  },
);
