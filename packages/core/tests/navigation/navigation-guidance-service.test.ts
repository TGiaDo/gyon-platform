import assert from "node:assert";
import test from "node:test";

import {
  LocationService,
  LocationTracker,
  NavigationEngine,
  NavigationGuidanceService,
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

test("NavigationGuidanceService creates instruction", () => {
  const provider = {
    start() {},
    stop() {},
  };

  const service =
    new LocationService(provider);

  const tracker =
    new LocationTracker(service);

  tracker.start();

  const session =
    new NavigationEngine()
      .createSession(route);

  const guidance =
    new NavigationGuidanceService(
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

  const instruction =
    guidance.update();

  assert.ok(instruction);
  assert.equal(
    instruction.text,
    "Turn right in 100 meters",
  );
});
