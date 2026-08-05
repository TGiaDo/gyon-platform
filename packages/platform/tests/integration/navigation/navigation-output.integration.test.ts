import assert from "node:assert";
import test from "node:test";

import {
  NavigationOutputPipeline,
} from "@gyon/core";


test(
  "navigation output pipeline forwards instruction",
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


    pipeline.send({
      id: "instruction-1",
      maneuver: "turn-left",
      distance: 50,
      text: "Turn left",
    } as any);



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
