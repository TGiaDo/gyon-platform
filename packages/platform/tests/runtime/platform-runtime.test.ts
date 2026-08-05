import assert from "node:assert";
import test from "node:test";

import {
  PlatformRuntime,
} from "../../src/index.js";


test(
  "PlatformRuntime initializes platform",
  () => {

    PlatformRuntime.initialize();


    assert.equal(
      PlatformRuntime.isInitialized(),
      true,
    );

  },
);



test(
  "PlatformRuntime initialization is idempotent",
  () => {

    PlatformRuntime.initialize();

    PlatformRuntime.initialize();


    assert.equal(
      PlatformRuntime.isInitialized(),
      true,
    );

  },
);
