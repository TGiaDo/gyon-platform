import assert from "node:assert";
import test from "node:test";

import {
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

const location = {
  coordinate: {
    latitude: 10.001,
    longitude: 106.001,
  },
  accuracy: 5,
  timestamp: {
    unixMilliseconds: Date.now(),
  },
};

test("PositionMatcher returns nearest route step", () => {
  const matcher = new PositionMatcher();

  const step = matcher.match(
    location,
    route,
  );

  assert.ok(step);
  assert.equal(step.id, "step-1");
});
