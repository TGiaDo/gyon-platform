import assert from "node:assert";
import test from "node:test";

import {
  NavigationRuntime,
} from "../../src/navigation/navigation-runtime.js";


const route = {
  id: "route-1",
  legs: [
    {
      distance: {
        meters: 1000,
      },
      duration: {
        seconds: 600,
      },
      steps: [
        {
          id: "step-1",
          maneuver: "turn-right",
          distance: {
            meters: 100,
          },
          duration: {
            seconds: 60,
          },
          end: {
            latitude: 10,
            longitude: 106,
          },
        },
      ],
    },
  ],
};


test(
  "NavigationRuntime emits guidance event",
  () => {

    const tracker = {
      getCurrentLocation() {
        return {
          latitude: 10,
          longitude: 106,
        };
      },
    } as any;


    const matcher = {
      match() {
        return route.legs[0].steps[0];
      },
    } as any;


    const runtime =
      new NavigationRuntime(
        tracker,
        matcher,
      );


    let received = false;


    runtime.onEvent(
      event => {
        received = true;

        assert.equal(
          event.type,
          "instruction",
        );
      },
    );


    runtime.start(route);

    runtime.update();


    assert.equal(
      received,
      true,
    );
  },
);
