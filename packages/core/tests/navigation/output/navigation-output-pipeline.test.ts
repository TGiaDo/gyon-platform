import assert from "node:assert";
import test from "node:test";

import {
  NavigationOutputPipeline,
} from "../../../src/navigation/output/navigation-output-pipeline.js";

test("NavigationOutputPipeline sends to all adapters", () => {

  let displayCalled = false;
  let hapticCalled = false;
  let notificationCalled = false;
  let voiceCalled = false;

  const display = {
    showInstruction() { displayCalled = true; },
    clear() {},
  };

  const haptic = {
    vibrate(ms: number) { hapticCalled = true; },
  } as any;

  const notification = {
    notify(payload: any) { notificationCalled = true; },
  } as any;

  const voice = {
    speak(text: string) { voiceCalled = true; },
  } as any;

  const pipeline = new NavigationOutputPipeline(
    display as any,
    haptic,
    notification,
    voice,
  );

  pipeline.send({
    id: "i1",
    action: "turn-left",
    text: "Turn left on Main St",
    distanceMeters: 120,
    etaMilliseconds: 60000,
    street: "Main St",
  } as any);

  assert.equal(displayCalled, true);
  assert.equal(hapticCalled, true);
  assert.equal(notificationCalled, true);
  assert.equal(voiceCalled, true);

});
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
