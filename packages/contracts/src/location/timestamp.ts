/**
 * Represents a point in time using a Unix timestamp.
 */
export interface Timestamp {
  /**
   * Unix timestamp expressed in milliseconds since 1970-01-01T00:00:00Z.
   */
  readonly unixMilliseconds: number;
}
