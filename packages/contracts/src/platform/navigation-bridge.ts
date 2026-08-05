import type {
  LocationFix,
} from "../location/location-fix.js";
import type {
  Maneuver,
} from "../routing/maneuver.js";
import type {
  NavigationState,
} from "../navigation/navigation-state.js";
import type {
  Route,
} from "../routing/route.js";

/**
 * Message payload sent from a companion device
 * to a wearable navigation client.
 */
export interface WatchNavigationMessage {

  /**
   * Optional route payload used to start navigation
   * on the watch client.
   */
  readonly route?:
    Route;

  /**
   * Optional current device location.
   */
  readonly location?:
    LocationFix;

  /**
   * Current route step identifier.
   */
  readonly stepId:
    string;

  /**
   * Maneuver to perform.
   */
  readonly maneuver:
    Maneuver;

  /**
   * Human readable instruction text.
   */
  readonly text:
    string;

  /**
   * Remaining distance for the current step.
   */
  readonly distanceMeters:
    number;

  /**
   * Name of the street for the current step.
   */
  readonly street:
    string;

  /**
   * Estimated time remaining for the current step.
   */
  readonly etaMilliseconds:
    number;

  /**
   * Navigation session status.
   */
  readonly status:
    NavigationState;
}

/**
 * Bridge used to send navigation messages
 * from the companion device to the wearable.
 */
export interface NavigationBridge {

  /**
   * Sends a navigation message.
   */
  send(
    message: WatchNavigationMessage,
  ): void;

  /**
   * Registers a message listener.
   */
  onMessage(
    listener: (
      message: WatchNavigationMessage,
    ) => void,
  ): () => void;
}
