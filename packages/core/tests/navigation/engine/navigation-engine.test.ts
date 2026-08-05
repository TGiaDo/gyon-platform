import assert from "node:assert";
import test from "node:test";

import {
  NavigationEngine,
  RouteProviderRegistry,
} from "../../../src/index.js";


test(
  "NavigationEngine calculates route through provider",
  async () => {

    const route = {} as never;

    RouteProviderRegistry.register({

      async calculate() {

        return route;

      },

    });


    const engine =
      new NavigationEngine();


    const result =
      await engine.calculateRoute(
        {} as never,
        {} as never,
      );


    assert.equal(
      result,
      route,
    );

  },
);
