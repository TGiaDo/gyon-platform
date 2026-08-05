import assert from "node:assert";
import test from "node:test";

import {
  LocationService,
  LocationTracker,
  NavigationEngine,
  NavigationProgressController,
  PositionMatcher,
} from "../../src/index.js";

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
          maneuver: "continue",
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
        {
          id: "step-2",
          maneuver: "turn-right",
          distance: {
            meters: 200,
          },
          duration: {
            seconds: 120,
          },
          end: {
            latitude: 11,
            longitude: 107,
          },
        },
      ],
    },
  ],
};

test("NavigationProgressController updates session step", () => {
  const provider = {
    start() {},
    stop() {},
  };

  const service = new LocationService(provider);

  const tracker = new LocationTracker(service);

  tracker.start();

  const engine = new NavigationEngine();

  const session =
    engine.createSession(route);

  const controller =
    new NavigationProgressController(
      tracker,
      new PositionMatcher(),
      session,
    );

  service.update({
    coordinate: {
      latitude: 10.001,
      longitude: 106.001,
    },
    accuracy: 5,
    timestamp: {
      unixMilliseconds: Date.now(),
    },
  });

  controller.update();

  assert.equal(
    session.getProgress().stepId,
    "step-1",
  );
});
