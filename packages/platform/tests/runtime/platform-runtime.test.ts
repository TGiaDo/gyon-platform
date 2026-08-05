import assert from "node:assert";
import test from "node:test";

import {
  PlatformRuntime,
  PlatformServices,
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
  "PlatformRuntime registers navigation service",
  () => {

    PlatformRuntime.initialize();


    const navigation =
      PlatformRuntime
        .getContainer()
        .get(
          PlatformServices.NAVIGATION,
        );


    assert.ok(
      navigation,
    );


    assert.equal(
      typeof (navigation as any).start,
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


test(
  "PlatformRuntime registers location service",
  () => {

    PlatformRuntime.reset();

    PlatformRuntime.initialize();


    const container =
      PlatformRuntime.getContainer();


    assert.equal(
      container.has(
        PlatformServices.LOCATION,
      ),
      true,
    );


    const locationService =
      container.get(
        PlatformServices.LOCATION,
      );


    assert.ok(
      locationService,
    );

  },
);
