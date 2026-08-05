import assert from "node:assert";
import test from "node:test";

import {
  PlatformAdapterManager,
  NavigationDisplayService,
} from "../../src/platform/index.js";


test(
  "PlatformAdapterManager exposes adapters",
  () => {

    const display = {
      showInstruction() {},
      clear() {},
    };

    const location = {
      getCurrentLocation() {
        return null;
      },
      start() {},
      stop() {},
    };

    const haptic = {
      vibrate() {},
    };


    const manager =
      new PlatformAdapterManager(
        display,
        location,
        haptic,
      );


    assert.equal(
      manager.getDisplay(),
      display,
    );

    assert.equal(
      manager.getLocation(),
      location,
    );

    assert.equal(
      manager.getHaptic(),
      haptic,
    );
  },
);


test(
  "NavigationDisplayService forwards instruction",
  () => {

    let received = false;


    const display = {
      showInstruction() {
        received = true;
      },
      clear() {},
    };


    const manager =
      new PlatformAdapterManager(
        display,
        {} as any,
        {} as any,
      );


    const service =
      new NavigationDisplayService(
        manager,
      );


    service.show(
      {
        id: "instruction-1",
        action: "turn-right",
      } as any,
    );


    assert.equal(
      received,
      true,
    );
  },
);
