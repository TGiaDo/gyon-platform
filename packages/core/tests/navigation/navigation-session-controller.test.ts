import assert from "node:assert";
import test from "node:test";

import {
  NavigationSessionController,
} from "../../src/navigation/navigation-session-controller.js";


test(
  "NavigationSessionController starts lifecycle",
  () => {

    let runtimeStarted = false;
    let trackerStarted = false;
    let updaterStarted = false;


    const runtime = {
      start() {
        runtimeStarted = true;
      },

      getSession() {
        return {
          cancel() {},
        };
      },
    } as any;


    const tracker = {
      start() {
        trackerStarted = true;
      },

      stop() {},
    } as any;


    const updater = {
      start() {
        updaterStarted = true;
      },

      stop() {},
    } as any;


    const controller =
      new NavigationSessionController(
        runtime,
        tracker,
        updater,
      );


    controller.start(
      {} as any,
    );


    assert.equal(
      runtimeStarted,
      true,
    );

    assert.equal(
      trackerStarted,
      true,
    );

    assert.equal(
      updaterStarted,
      true,
    );
  },
);



test(
  "NavigationSessionController stops lifecycle",
  () => {

    let updaterStopped = false;
    let trackerStopped = false;
    let cancelled = false;


    const runtime = {
      start() {},

      getSession() {
        return {
          cancel() {
            cancelled = true;
          },
        };
      },
    } as any;


    const tracker = {
      start() {},

      stop() {
        trackerStopped = true;
      },
    } as any;


    const updater = {
      start() {},

      stop() {
        updaterStopped = true;
      },
    } as any;


    const controller =
      new NavigationSessionController(
        runtime,
        tracker,
        updater,
      );


    controller.start(
      {} as any,
    );

    controller.stop();


    assert.equal(
      updaterStopped,
      true,
    );

    assert.equal(
      trackerStopped,
      true,
    );

    assert.equal(
      cancelled,
      true,
    );
  },
);
