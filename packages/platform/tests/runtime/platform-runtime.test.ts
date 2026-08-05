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


    assert.ok(
      PlatformRuntime.getContainer(),
    );

  },
);



test(
  "PlatformRuntime exposes platform container",
  () => {

    const container =
      PlatformRuntime.getContainer();


    assert.ok(
      container,
    );


    assert.equal(
      typeof container.register,
      "function",
    );


    assert.equal(
      typeof container.get,
      "function",
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
