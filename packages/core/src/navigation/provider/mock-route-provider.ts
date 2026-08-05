import type {
  Route,
} from "@gyon/contracts";

import type {
  RoutePlanningContext,
} from "../model/route-planning-context.js";

import type {
  RouteProvider,
} from "./route-provider.js";

import type {
  RouteProviderMetadata,
} from "./model/index.js";

import {
  RouteProviderRegistry,
} from "./route-provider-registry.js";

const route: Route = {
  distance: {
    meters: 5400,
  },
  duration: {
    milliseconds: 900000,
  },
  legs: [
    {
      distance: {
        meters: 5400,
      },
      duration: {
        milliseconds: 900000,
      },
      steps: [
        {
          id: "step-1",
          maneuver: "depart",
          distance: {
            meters: 2000,
          },
          duration: {
            milliseconds: 240000,
          },
          end: {
            latitude: 37.3317,
            longitude: -122.0301,
          },
          street: "1st Avenue",
        },
        {
          id: "step-2",
          maneuver: "turn-right",
          distance: {
            meters: 1200,
          },
          duration: {
            milliseconds: 180000,
          },
          end: {
            latitude: 37.3350,
            longitude: -122.0290,
          },
          street: "Market Street",
        },
        {
          id: "step-3",
          maneuver: "turn-left",
          distance: {
            meters: 2200,
          },
          duration: {
            milliseconds: 300000,
          },
          end: {
            latitude: 37.3386,
            longitude: -122.0270,
          },
          street: "Main Street",
        },
        {
          id: "step-4",
          maneuver: "arrive",
          distance: {
            meters: 0,
          },
          duration: {
            milliseconds: 0,
          },
          end: {
            latitude: 37.3390,
            longitude: -122.0265,
          },
          street: "Destination",
        },
      ],
    },
  ],
};

const metadata: RouteProviderMetadata = {
  id: "mock-route-provider",
  name: "Mock Route Provider",
  capabilities: {
    offline: true,
    traffic: false,
    modes: ["walking", "cycling", "driving"],
  },
  priority: 10,
  health: {
    status: "healthy",
    latency: 0,
  },
};

const provider: RouteProvider = {
  metadata,
  async calculate(
    _context: RoutePlanningContext,
  ):
    Promise<Route> {

    return route;

  },
};

let registered = false;

export function registerMockRouteProvider(): void {
  if (registered) {
    return;
  }

  RouteProviderRegistry.register(
    provider,
  );

  registered = true;
}
