import assert from "node:assert";
import test from "node:test";

import {
  NavigationEngine,
} from "../../src/index.ts";

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

test("NavigationSession returns first step progress", () => {
  const engine = new NavigationEngine();

  const session = engine.createSession(route);

  const progress = session.getProgress();

  assert.equal(progress.stepId, "step-1");
  assert.equal(progress.distanceRemaining.meters, 100);
});
