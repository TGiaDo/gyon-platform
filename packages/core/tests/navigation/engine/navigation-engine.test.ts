import assert from "node:assert";
import test, { beforeEach } from "node:test";

import {
  NavigationEngine,
  RouteProviderRegistry,
} from "../../../src/index.js";


beforeEach(
  () => {

    RouteProviderRegistry.clear();

  },
);


test(
  "NavigationEngine calculates route through provider",
  async () => {

    const route = {} as never;

    RouteProviderRegistry.register({

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


      async calculate(
        context,
      ) {

        assert.equal(
          context.options?.mode,
          "walking",
        );


        assert.equal(
          context.options?.offline,
          true,
        );


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


test(
  "NavigationEngine selects highest priority provider",
  async () => {

    const lowRoute = {} as never;

    const highRoute = {} as never;


    RouteProviderRegistry.register({

      metadata: {

        id: "low",

        name: "Low Provider",

        priority: 10,

        capabilities: {

          offline: true,

          traffic: false,

          modes: [
            "walking",
          ],

        },

      },


      async calculate() {

        return lowRoute;

      },

    });


    RouteProviderRegistry.register({

      metadata: {

        id: "high",

        name: "High Provider",

        priority: 100,

        capabilities: {

          offline: true,

          traffic: false,

          modes: [
            "walking",
          ],

        },

      },


      async calculate() {

        return highRoute;

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
      highRoute,
    );

  },
);
