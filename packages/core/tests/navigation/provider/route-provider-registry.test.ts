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
