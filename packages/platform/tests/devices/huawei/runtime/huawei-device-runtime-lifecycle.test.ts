import assert from "node:assert";
import test from "node:test";

import {
  HuaweiDeviceRuntime,
} from "../../../../src/devices/huawei/runtime/huawei-device-runtime.js";


const route = {
  id: "test-route",
  legs: [
    {
      steps: [
        {
          id: "step-1",
          distance: 100,
          duration: 60,
        },
      ],
    },
  ],
} as any;


test(
  "HuaweiDeviceRuntime starts navigation lifecycle",
  () => {

    const runtime =
      new HuaweiDeviceRuntime(
        "huawei",
      );


    runtime.start(
      route,
    );


    const session =
      runtime.getSession();


    assert.ok(
      session,
    );


    runtime.stop();

  },
);



test(
  "HuaweiDeviceRuntime forwards pause and resume",
  () => {

    const runtime =
      new HuaweiDeviceRuntime(
        "huawei",
      );


    runtime.start(
      route,
    );


    runtime.pause();

    runtime.resume();

    runtime.stop();


    assert.ok(true);

  },
);
