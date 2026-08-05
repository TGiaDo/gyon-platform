import assert from "node:assert";
import test from "node:test";

import {
  NavigationPlatformRuntime,
} from "../../src/navigation/navigation-platform-runtime.js";


test(
  "NavigationPlatformRuntime sends instruction to display",
  () => {

    let displayed = false;


    const guidance = {
      update() {
        return {
          id: "instruction-1",
          action: "turn-right",
        };
      },
    };


    const display = {
      show() {
        displayed = true;
      },

      clear() {},
    };


    const runtime =
      new NavigationPlatformRuntime(
        guidance as any,
        display as any,
      );


    const result =
      runtime.update();


    assert.equal(
      result?.id,
      "instruction-1",
    );


    assert.equal(
      displayed,
      true,
    );
  },
);
