import assert from "node:assert";
import test from "node:test";

import {
  WatchNavigationRuntime,
} from "../../src/navigation/watch-navigation-runtime.js";


test(
  "WatchNavigationRuntime starts navigation",
  () => {

    let started = false;


    const controller = {

      start() {
        started = true;
      },

      stop() {},

      pause() {},

      resume() {},

      getSession() {
        return undefined;
      },

    } as any;


    const runtime =
      new WatchNavigationRuntime(
        controller,
      );


    runtime.start(
      {} as any,
    );


    assert.equal(
      started,
      true,
    );
  },
);



test(
  "WatchNavigationRuntime controls lifecycle",
  () => {

    const calls: string[] = [];


    const controller = {

      start() {},

      stop() {
        calls.push("stop");
      },

      pause() {
        calls.push("pause");
      },

      resume() {
        calls.push("resume");
      },

      getSession() {
        return undefined;
      },

    } as any;


    const runtime =
      new WatchNavigationRuntime(
        controller,
      );


    runtime.pause();
    runtime.resume();
    runtime.stop();


    assert.deepEqual(
      calls,
      [
        "pause",
        "resume",
        "stop",
      ],
    );
  },
);
