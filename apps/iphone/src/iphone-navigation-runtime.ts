import type {
  LocationFix,
  NavigationInstruction,
  Route,
} from "@gyon/contracts";

import type {
  NavigationBridge,
  VoiceAdapter,
} from "@gyon/contracts";

import {
  IphoneNavigationApp,
} from "./iphone-navigation-app.js";
import {
  BridgeDisplayAdapter,
} from "./bridge-display-adapter.js";
import {
  PositionMatcher,
} from "@gyon/core";

/**
 * Runtime helper for the iPhone companion app.
 */
export class IphoneNavigationRuntime {
  private app: IphoneNavigationApp;

  private displayAdapter:
    BridgeDisplayAdapter | null = null;

  constructor(
    private readonly bridge:
      NavigationBridge,

    private readonly voice:
      VoiceAdapter,
  ) {
    this.app = new IphoneNavigationApp(
      this as any,
      bridge,
      voice,
    );
  }

  start(
    route: Route,
  ): void {
    this.displayAdapter =
      new BridgeDisplayAdapter(
        this.bridge,
        route,
        new PositionMatcher(),
      );

    this.app.startNavigation(
      route,
    );
  }

  updateLocation(
    location: LocationFix,
  ): void {
    this.displayAdapter?.updateLocation(
      location,
    );
  }

}
