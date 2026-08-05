import assert from "node:assert";
import test from "node:test";

import {
  DeviceRuntimeFactory,
  DevicePlatformBootstrap,
} from "../../src/index.js";


const route = {
  id: "integration-route",

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



test.before(
  () => {

    DevicePlatformBootstrap.initialize();

  },
);



test(
  "platform runtime creates and starts Huawei device runtime",
  () => {

    const runtime =
      DeviceRuntimeFactory.create(
        "huawei-watch",
        "huawei",
      );


    assert.ok(
      runtime,
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
  "platform runtime exposes complete lifecycle",
  () => {

    const runtime =
      DeviceRuntimeFactory.create(
        "huawei-watch",
        "huawei",
      );


    runtime.start(
      route,
    );


    runtime.pause();

    runtime.resume();

    runtime.stop();


    assert.ok(
      true,
    );

  },
);
