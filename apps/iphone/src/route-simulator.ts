import type {
  NavigationBridge,
  VoiceAdapter,
  WatchNavigationMessage,
} from "@gyon/contracts";
import type {
  Route,
  RouteStep,
} from "@gyon/contracts";
import {
  InstructionEngine,
} from "@gyon/core";

const stepDurationMs = 1500;

export class RouteSimulator {
  private currentStepIndex = 0;

  private timer:
    ReturnType<typeof setTimeout> | null = null;

  constructor(
    private readonly bridge:
      NavigationBridge,

    private readonly voice:
      VoiceAdapter,

    private readonly route:
      Route,
  ) {}

  start(): void {
    this.sendCurrentStep(
      "started",
    );
  }

  stop(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private sendCurrentStep(
    status: string,
  ): void {
    const step =
      this.route.legs[0]?.steps[
        this.currentStepIndex
      ];

    if (!step) {
      return;
    }

    const instruction =
      new InstructionEngine().create(
        step,
      );

    const message: WatchNavigationMessage = {
      route: this.route,
      stepId: step.id,
      maneuver: step.maneuver,
      text: instruction.text,
      distanceMeters:
        step.distance.meters,
      street: step.street ??
        "Unknown",
      etaMilliseconds:
        this.remainingDuration(),
      status:
        status as any,
    };

    this.bridge.send(
      message,
    );

    this.voice.speak(
      instruction.text,
    );

    if (
      step.maneuver === "arrive"
    ) {
      return;
    }

    this.scheduleNextStep();
  }

  private scheduleNextStep(): void {
    this.timer = setTimeout(
      () => {
        this.currentStepIndex += 1;

        const nextStep =
          this.route.legs[0]?.steps[
            this.currentStepIndex
          ];

        if (!nextStep) {
          return;
        }

        const status =
          nextStep.maneuver === "arrive"
            ? "arrived"
            : "navigating";

        this.sendCurrentStep(
          status,
        );
      },
      stepDurationMs,
    );
  }

  private remainingDuration(): number {
    const remainingSteps =
      this.route.legs[0]?.steps.slice(
        this.currentStepIndex,
      ) ?? [];

    return remainingSteps.reduce(
      (total, step) =>
        total + step.duration.milliseconds,
      0,
    );
  }
}
