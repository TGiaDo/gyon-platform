import type {
  DisplayAdapter,
  LocationAdapter,
  HapticAdapter,
} from "@gyon/contracts";


/**
 * Provides access to platform capabilities.
 */
export class PlatformAdapterManager {

  constructor(
    private readonly display: DisplayAdapter,
    private readonly location: LocationAdapter,
    private readonly haptic: HapticAdapter,
  ) {}


  /**
   * Returns display adapter.
   */
  getDisplay():
    DisplayAdapter {

    return this.display;
  }


  /**
   * Returns location adapter.
   */
  getLocation():
    LocationAdapter {

    return this.location;
  }


  /**
   * Returns haptic adapter.
   */
  getHaptic():
    HapticAdapter {

    return this.haptic;
  }
}
