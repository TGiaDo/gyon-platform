import assert from "node:assert";
import test from "node:test";

import {
  DeviceRuntimeFactory,
} from "../../../src/devices/runtime/device-runtime-factory.js";

import {
  DevicePlatformBootstrap,
} from "../../../src/devices/bootstrap/device-platform-bootstrap.js";


test(
  "DeviceRuntimeFactory creates Huawei watch runtime",
  () => {


    DevicePlatformBootstrap.initialize();


    const runtime =
      DeviceRuntimeFactory.create(
        "huawei-watch",
        "huawei",
      );


    assert.ok(
      runtime,
    );


    assert.equal(
      typeof runtime.start,
      "function",
    );


    assert.equal(
      typeof runtime.stop,
      "function",
    );


    assert.equal(
      typeof runtime.pause,
      "function",
    );


    assert.equal(
      typeof runtime.resume,
      "function",
    );

  },
);



test(
  "DeviceRuntimeFactory rejects unsupported device",
  () => {


    DevicePlatformBootstrap.initialize();


    assert.throws(
      () => {

        DeviceRuntimeFactory.create(
          "unknown" as any,
          "huawei",
        );

      },
    );

  },
);
