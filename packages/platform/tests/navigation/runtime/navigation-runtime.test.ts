import assert from "node:assert";
import test from "node:test";

import {
  NavigationRuntimeFactory,
  DeviceNavigationRuntime,
} from "../../../src/index.js";

import {
  WatchNavigationRuntime,
} from "@gyon/core";



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
  "NavigationRuntimeFactory creates core navigation runtime",
  () => {

    const runtime =
      NavigationRuntimeFactory.create(
        "simulator",
      );


    assert.ok(
      runtime,
    );


    assert.equal(
      typeof runtime.update,
      "function",
    );

  },
);



test(
  "DeviceNavigationRuntime controls lifecycle",
  () => {

    let started = false;
    let paused = false;
    let resumed = false;
    let stopped = false;


    const controller = {

      start(
        _route: any,
      ) {

        started = true;

      },


      stop() {

        stopped = true;

      },


      pause() {

        paused = true;

      },


      resume() {

        resumed = true;

      },


      getSession() {

        return {
          id: "session",
        };

      },

    } as any;



    const watchRuntime =
      new WatchNavigationRuntime(
        controller,
      );



    const deviceRuntime =
      new DeviceNavigationRuntime(
        watchRuntime,
      );



    deviceRuntime.start(
      route,
    );


    deviceRuntime.pause();

    deviceRuntime.resume();

    deviceRuntime.stop();



    assert.equal(
      started,
      true,
    );


    assert.equal(
      paused,
      true,
    );


    assert.equal(
      resumed,
      true,
    );


    assert.equal(
      stopped,
      true,
    );


    assert.ok(
      deviceRuntime.getSession(),
    );

  },
);
