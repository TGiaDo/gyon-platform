import type {
  ProviderHealthState,
} from "./provider-health-state.js";


/**
 * Tracks runtime health of route providers.
 */
export class ProviderHealthMonitor {

  private states:
    Map<string, ProviderHealthState>
    =
    new Map();


  /**
   * Registers provider.
   */
  register(
    providerId: string,
  ): void {

    if (
      this.states.has(providerId)
    ) {

      return;

    }


    this.states.set(
      providerId,
      {
        status:
          "healthy",

        latency:
          0,

        failures:
          0,

        lastSuccessAt:
          undefined,
      },
    );

  }


  /**
   * Records successful execution.
   */
  recordSuccess(
    providerId: string,
    latency: number,
  ): void {

    this.states.set(
      providerId,
      {
        status:
          "healthy",

        latency,

        failures:
          0,

        lastSuccessAt:
          Date.now(),

      },
    );

  }


  /**
   * Records provider failure.
   */
  recordFailure(
    providerId: string,
  ): void {

    const current =
      this.states.get(providerId);


    if (
      !current
    ) {

      return;

    }


    const failures =
      current.failures + 1;


    this.states.set(
      providerId,
      {
        ...current,

        failures,

        status:
          failures >= 3
            ? "offline"
            : "degraded",

      },
    );

  }


  /**
   * Returns provider health.
   */
  get(
    providerId: string,
  ):
    ProviderHealthState | undefined {

    return this.states.get(
      providerId,
    );

  }

}
