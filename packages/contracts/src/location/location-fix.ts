import type { Bearing } from "./bearing.js";
import type { Coordinate } from "./coordinate.js";
import type { Distance } from "./distance.js";
import type { Heading } from "./heading.js";
import type { Speed } from "./speed.js";
import type { Timestamp } from "./timestamp.js";

/**
 * Represents a single location update.
 */
export interface LocationFix {
  /**
   * Geographic coordinate.
   */
  readonly coordinate: Coordinate;

  /**
   * Position accuracy.
   */
  readonly accuracy?: Distance;

  /**
   * Direction of travel.
   */
  readonly heading?: Heading;

  /**
   * Bearing towards the destination.
   */
  readonly bearing?: Bearing;

  /**
   * Current speed.
   */
  readonly speed?: Speed;

  /**
   * Time at which the fix was recorded.
   */
  readonly timestamp: Timestamp;
}
