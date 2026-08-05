import assert from "node:assert";
import test from "node:test";


import {
  GyonPlatform,
} from "../../src/index.js";



test(
  "GyonPlatform initializes public api",
  () => {


    const platform =
      GyonPlatform.initialize();


    assert.ok(
      platform,
    );


    assert.ok(
      platform.location,
    );


    assert.ok(
      platform.navigation,
    );

  },
);



test(
  "GyonPlatform exposes location api",
  () => {


    const platform =
      GyonPlatform.initialize();


    const location =
      platform.location;


    assert.equal(
      typeof location.start,
      "function",
    );


    assert.equal(
      typeof location.stop,
      "function",
    );


  },
);



test(
  "GyonPlatform exposes navigation api",
  () => {


    const platform =
      GyonPlatform.initialize();


    const navigation =
      platform.navigation;


    assert.equal(
      typeof navigation.start,
      "function",
    );


    assert.equal(
      typeof navigation.stop,
      "function",
    );


  },
);
