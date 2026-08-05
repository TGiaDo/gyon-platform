import assert from "node:assert";
import test from "node:test";

import {
  NavigationOutputPipeline,
} from "../../../src/navigation/output/navigation-output-pipeline.js";


test(
  "NavigationOutputPipeline sends instruction to display and haptic",
  () => {

    let displayed = false;
    let vibrated = false;


    const display = {
      showInstruction() {
        displayed = true;
      },

      clear() {},
    };


    const haptic = {
      vibrate() {
        vibrated = true;
      },
    };


    const pipeline =
      new NavigationOutputPipeline(
        display,
        haptic,
      );


    pipeline.send(
      {
        id: "turn-right",
        action: "turn-right",
      } as any,
    );


    assert.equal(
      displayed,
      true,
    );


    assert.equal(
      vibrated,
      true,
    );
  },
);
