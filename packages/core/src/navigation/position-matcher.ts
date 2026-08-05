import type {
  Coordinate,
  LocationFix,
  Route,
  RouteStep,
} from "@gyon/contracts";

/**
 * Matches device position against a route.
 */
export class PositionMatcher {
  /**
   * Finds the closest route step.
   */
  match(
    location: LocationFix,
    route: Route,
  ): RouteStep | null {
    const steps =
      route.legs[0]?.steps ?? [];

    if (steps.length === 0) {
      return null;
    }

    let closest: RouteStep | null = null;

    let closestDistance =
      Number.POSITIVE_INFINITY;

    for (const step of steps) {
      const distance =
        this.distanceBetween(
          location.coordinate,
          step.end,
        );

      if (distance < closestDistance) {
        closestDistance = distance;
        closest = step;
      }
    }

    return closest;
  }

  /**
   * Calculates approximate distance between coordinates.
   */
  private distanceBetween(
    a: Coordinate,
    b: Coordinate,
  ): number {
    const lat =
      a.latitude - b.latitude;

    const lon =
      a.longitude - b.longitude;

    return Math.sqrt(
      lat * lat +
      lon * lon,
    );
  }
}
