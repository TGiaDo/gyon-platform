import assert from "node:assert";
import test from "node:test";

import {
  ProviderHealthMonitor,
  RouteProviderRuntime,
} from "../../../../src/index.js";


test(
  "RouteProviderRuntime records successful provider execution",
  async () => {

    const monitor =
      new ProviderHealthMonitor();


    monitor.register(
      "test",
    );


    const route =
      {} as never;


    const runtime =
      new RouteProviderRuntime(

        {
          metadata: {

            id: "test",

            name: "Test Provider",

            priority: 10,

            health: {

              status:
                "healthy",

              latency:
                0,

            },

            capabilities: {

              offline:
                true,

              traffic:
                false,

              modes: [
                "walking",
              ],

            },

          },


          async calculate() {

            return route;

          },

        },

        monitor,

      );


    const result =
      await runtime.calculate(
        {} as never,
      );


    assert.equal(
      result,
      route,
    );


    assert.equal(
      monitor.get("test")?.status,
      "healthy",
    );

  },
);


test(
  "RouteProviderRuntime records provider failure",
  async () => {

    const monitor =
      new ProviderHealthMonitor();


    monitor.register(
      "test",
    );


    const runtime =
      new RouteProviderRuntime(

        {
          metadata: {

            id: "test",

            name: "Test Provider",

            priority: 10,

            health: {

              status:
                "healthy",

              latency:
                0,

            },

            capabilities: {

              offline:
                true,

              traffic:
                false,

              modes: [
                "walking",
              ],

            },

          },


          async calculate() {

            throw new Error(
              "provider failed",
            );

          },

        },

        monitor,

      );


    await assert.rejects(
      () =>
        runtime.calculate(
          {} as never,
        ),
    );


    assert.equal(
      monitor.get("test")?.failures,
      1,
    );

  },
);
