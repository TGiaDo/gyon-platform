import assert from "node:assert";
import test from "node:test";

import {
  RouteProviderRegistry,
} from "../../../src/index.js";


test(
  "RouteProviderRegistry registers provider",
  () => {

    const provider = {
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

  },
);
