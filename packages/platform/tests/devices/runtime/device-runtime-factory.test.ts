import assert from "node:assert";
import test from "node:test";

import {
  DeviceRuntimeFactory,
} from "../../../src/devices/runtime/device-runtime-factory.js";


test(
  "DeviceRuntimeFactory creates Huawei watch runtime",
  () => {

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
