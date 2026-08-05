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

test("navigation session lifecycle", () => {
  const engine = new NavigationEngine();

  const session = engine.createSession(route);

  assert.equal(
    session.getState(),
    "idle",
  );

  session.start();

  assert.equal(
    session.getState(),
    "started",
  );

  session.activate();

  assert.equal(
    session.getState(),
    "navigating",
  );

  session.complete();

  assert.equal(
    session.getState(),
    "arrived",
  );
});


test("navigation session can be cancelled", () => {
  const engine = new NavigationEngine();

  const session = engine.createSession(route);

  session.start();

  session.cancel();

  assert.equal(
    session.getState(),
    "cancelled",
  );
});
