import assert from "node:assert";
import test from "node:test";

import {
  DevicePluginRegistry,
} from "../../../src/devices/plugin/device-plugin-registry.js";

import {
  HuaweiDevicePlugin,
} from "../../../src/devices/huawei/huawei-device-plugin.js";


test(
  "registers Huawei device plugin",
  () => {

    DevicePluginRegistry.register(
      HuaweiDevicePlugin,
    );


    assert.equal(
      DevicePluginRegistry.get(
        "huawei-watch",
      )?.id,
      "huawei-watch",
    );

  },
);



test(
  "creates runtime from Huawei plugin",
  () => {


    DevicePluginRegistry.register(
      HuaweiDevicePlugin,
    );


    const runtime =
      DevicePluginRegistry.createRuntime(
        "huawei-watch",
        "simulator",
      );


    assert.ok(
      runtime,
    );


    assert.equal(
      typeof runtime.start,
      "function",
    );

  },
);
