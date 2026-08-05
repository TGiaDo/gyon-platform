import assert from "node:assert";
import test from "node:test";

import {
  RouteProviderRegistry,
} from "../../../src/index.js";


test(
  "RouteProviderRegistry registers provider",
  () => {

    const provider = {

      metadata: {

        id: "test",

        name: "Test Provider",

        capabilities: {

          offline: true,

          traffic: false,

          modes: [
            "walking",
          ],

        },

      },


      async calculate() {
        return {} as never;
      },

    };

    RouteProviderRegistry.register(
      provider,
    );

    assert.equal(
      RouteProviderRegistry.get(),
      provider,
    );


    assert.equal(
      RouteProviderRegistry.get()
        ?.metadata.id,
      "test",
    );

  },
);


test(
  "RouteProviderRegistry finds provider by capabilities",
  () => {

    const provider = {

      metadata: {

        id: "offline",

        name: "Offline Provider",

        capabilities: {

          offline: true,

          traffic: false,

          modes: [
            "walking",
          ],

        },

      },


      async calculate() {
        return {} as never;
      },

    };


    RouteProviderRegistry.register(
      provider,
    );


    const result =
      RouteProviderRegistry.find({
        offline: true,
        mode: "walking",
      });


    assert.equal(
      result,
      provider,
    );

  },
);
