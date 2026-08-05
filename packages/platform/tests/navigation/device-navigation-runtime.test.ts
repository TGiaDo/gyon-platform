import assert from "node:assert";
import test from "node:test";

import {
  DeviceNavigationRuntime,
} from "../../src/navigation/device-navigation-runtime.js";


test(
  "DeviceNavigationRuntime starts navigation",
  () => {

    let started = false;


    const runtime = {

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


    const deviceRuntime =
      new DeviceNavigationRuntime(
        runtime,
      );


    deviceRuntime.start(
      {} as any,
    );


    assert.equal(
      started,
      true,
    );
  },
);



test(
  "DeviceNavigationRuntime controls lifecycle",
  () => {

    const calls: string[] = [];


    const runtime = {

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


    const deviceRuntime =
      new DeviceNavigationRuntime(
        runtime,
      );


    deviceRuntime.pause();
    deviceRuntime.resume();
    deviceRuntime.stop();


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
