import {
  DevicePlatformBootstrap,
} from "../devices/bootstrap/device-platform-bootstrap.js";

import {
  PlatformContainer,
} from "../container/platform-container.js";



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
  static initialize(): void {


    if (
      PlatformRuntime.initialized
    ) {

      return;

    }



    DevicePlatformBootstrap.initialize();



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
