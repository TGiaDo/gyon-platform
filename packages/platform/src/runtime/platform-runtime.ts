import {
  DevicePlatformBootstrap,
} from "../devices/bootstrap/device-platform-bootstrap.js";

import {
  PlatformContainer,
} from "../container/platform-container.js";

import {
  LocationRuntimeFactory,
} from "../location/provider/location-runtime-factory.js";

import {
  DeviceNavigationRuntimeFactory,
} from "../navigation/runtime/device-navigation-runtime-factory.js";

import {
  PlatformServices,
} from "../services/platform-services.js";

import type {
  PlatformRuntimeOptions,
} from "./options/platform-runtime-options.js";



/**
 * Main platform initialization runtime.
 *
 * Initializes and owns platform services.
 */
export class PlatformRuntime {


  private static initialized =
    false;


  private static container =
    new PlatformContainer();



  /**
   * Initializes Gyon platform.
   */
  static initialize(
    options: PlatformRuntimeOptions = {},
  ): void {


    if (
      PlatformRuntime.initialized
    ) {

      return;

    }



    DevicePlatformBootstrap.initialize();


    const locationService =
      LocationRuntimeFactory.create(
        options.provider ??
          "simulator",
      );


    PlatformRuntime.container.register(
      PlatformServices.LOCATION,
      locationService,
    );


    const navigationRuntime =
      DeviceNavigationRuntimeFactory.create(
        options.provider ??
          "simulator",
      );


    PlatformRuntime.container.register(
      PlatformServices.NAVIGATION,
      navigationRuntime,
    );



    PlatformRuntime.initialized =
      true;

  }



  /**
   * Returns platform container.
   */
  static getContainer():
    PlatformContainer {

    return PlatformRuntime.container;

  }



  /**
   * Returns initialization state.
   */
  static isInitialized(): boolean {

    return PlatformRuntime.initialized;

  }



  /**
   * Resets runtime.
   *
   * Used only for tests.
   */
  static reset(): void {

    PlatformRuntime.container.clear();


    PlatformRuntime.initialized =
      false;

  }

}
