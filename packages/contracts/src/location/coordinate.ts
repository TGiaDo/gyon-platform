/**
 * Represents a geographic coordinate using the WGS84 coordinate system.
 */
export interface Coordinate {
  /**
   * Latitude in decimal degrees.
   * Valid range: -90 to 90.
   */
  readonly latitude: number;

  /**
   * Longitude in decimal degrees.
   * Valid range: -180 to 180.
   */
  readonly longitude: number;
}
