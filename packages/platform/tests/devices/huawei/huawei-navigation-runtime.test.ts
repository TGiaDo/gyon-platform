import assert from "node:assert";
import test from "node:test";

import {
  HuaweiNavigationRuntime,
} from "../../../src/devices/huawei/huawei-navigation-runtime.js";


test(
  "HuaweiNavigationRuntime starts navigation",
  () => {

    let started = false;


    const deviceRuntime = {

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
      new HuaweiNavigationRuntime(
        deviceRuntime,
        {} as any,
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
  "HuaweiNavigationRuntime forwards lifecycle",
  () => {

    const calls: string[] = [];


    const deviceRuntime = {

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
      new HuaweiNavigationRuntime(
        deviceRuntime,
        {} as any,
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
