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
        meters: 2000,
      },
      duration: {
        seconds: 1200,
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
        {
          id: "step-2",
          maneuver: "continue",
          distance: {
            meters: 500,
          },
          duration: {
            seconds: 300,
          },
          end: {
            latitude: 10.1,
            longitude: 106.1,
          },
        },
      ],
    },
  ],
};

test("navigation session advances route steps", () => {
  const engine = new NavigationEngine();

  const session = engine.createSession(route);

  const firstProgress = session.getProgress();

  assert.equal(
    firstProgress.stepId,
    "step-1",
  );

  session.advanceStep();

  const secondProgress = session.getProgress();

  assert.equal(
    secondProgress.stepId,
    "step-2",
  );
});
