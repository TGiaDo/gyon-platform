import assert from "node:assert";
import test, { beforeEach } from "node:test";

import {
  RouteProviderRegistry,
} from "../../../src/index.js";


beforeEach(
  () => {

    RouteProviderRegistry.clear();

  },
);


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


test(
  "RouteProviderRegistry finds matching provider among multiple providers",
  () => {

    const offlineProvider = {

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


    const drivingProvider = {

      metadata: {

        id: "driving",

        name: "Driving Provider",

        capabilities: {

          offline: false,

          traffic: true,

          modes: [
            "driving",
          ],

        },

      },


      async calculate() {
        return {} as never;
      },

    };


    RouteProviderRegistry.register(
      offlineProvider,
    );


    RouteProviderRegistry.register(
      drivingProvider,
    );


    const result =
      RouteProviderRegistry.find({
        mode: "driving",
      });


    assert.equal(
      result,
      drivingProvider,
    );

  },
);


test(
  "RouteProviderRegistry selects highest priority provider",
  () => {

    const lowPriorityProvider = {

      metadata: {

        id: "low",

        name: "Low Priority Provider",

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
        return {} as never;
      },

    };


    const highPriorityProvider = {

      metadata: {

        id: "high",

        name: "High Priority Provider",

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
        return {} as never;
      },

    };


    RouteProviderRegistry.register(
      lowPriorityProvider,
    );


    RouteProviderRegistry.register(
      highPriorityProvider,
    );


    const result =
      RouteProviderRegistry.findBest({
        mode: "walking",
      });


    assert.equal(
      result,
      highPriorityProvider,
    );

  },
);
