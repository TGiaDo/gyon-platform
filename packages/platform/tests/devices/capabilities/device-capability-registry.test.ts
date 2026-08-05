import assert from "node:assert";
import test from "node:test";

import {
  DeviceCapabilityRegistry,
} from "../../../src/devices/capabilities/device-capability-registry.js";

import {
  HuaweiWatchCapability,
} from "../../../src/devices/huawei/capabilities/huawei-watch-capability.js";


test(
  "registers Huawei watch capabilities",
  () => {

    DeviceCapabilityRegistry.register(
      HuaweiWatchCapability,
    );


    assert.equal(
      DeviceCapabilityRegistry.has(
        "huawei-watch",
      ),
      true,
    );


    const capability =
      DeviceCapabilityRegistry.get(
        "huawei-watch",
      );


    assert.deepEqual(
      capability?.features,
      [
        "location",
        "navigation",
        "display",
        "haptic",
      ],
    );

  },
);
