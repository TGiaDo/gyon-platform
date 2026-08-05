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

      async calculate(
        request,
      ) {

        return route;

      },

    });


    const engine =
      new NavigationEngine();


    const result =
      await engine.calculateRoute({
        request: {
          origin: {} as never,
          destination: {} as never,
        },

        options: {
          mode: "walking",
          offline: true,
        },
      });


    assert.equal(
      result,
      route,
    );

  },
);
