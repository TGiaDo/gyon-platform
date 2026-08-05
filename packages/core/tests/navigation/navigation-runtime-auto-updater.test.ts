import assert from "node:assert";
import test from "node:test";

import {
  NavigationRuntimeAutoUpdater,
} from "../../src/navigation/navigation-runtime-auto-updater.js";


test(
  "NavigationRuntimeAutoUpdater triggers runtime update",
  () => {

    let updated = false;


    const listeners =
      new Set<
        () => void
      >();


    const tracker = {

      onUpdate(
        listener: () => void,
      ) {

        listeners.add(
          listener,
        );


        return () => {
          listeners.delete(
            listener,
          );
        };
      },

    } as any;



    const runtime = {

      update() {
        updated = true;
      },

    } as any;



    const updater =
      new NavigationRuntimeAutoUpdater(
        tracker,
        runtime,
      );


    updater.start();


    for (const listener of listeners) {
      listener();
    }


    assert.equal(
      updated,
      true,
    );


    updater.stop();
  },
);
