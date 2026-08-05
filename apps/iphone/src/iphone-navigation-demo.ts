import {
  GyonPlatform,
} from "@gyon/platform";

import {
  InMemoryNavigationBridge,
} from "@gyon/platform";

import {
  registerMockRouteProvider,
} from "@gyon/core";

import {
  IphoneNavigationApp,
} from "./iphone-navigation-app.js";

import {
  IphoneVoiceAdapter,
} from "./iphone-voice-adapter.js";

const bridge =
  new InMemoryNavigationBridge();

registerMockRouteProvider();

const platform =
  GyonPlatform.initialize({
    provider: "simulator",
  });

const engine =
  new (platform as any).navigation.constructor(
    platform,
  );

const app =
  new IphoneNavigationApp(
    engine,
    bridge,
    new IphoneVoiceAdapter(),
  );

const route = await platform.location.getCurrentLocation();

if (!route) {
  throw new Error("No location available");
}

console.log("iPhone navigation app started");

// This demo is intentionally minimal. Production apps should
// use native UI and properly start navigation from routes.
