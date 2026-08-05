# ADR-0001: Vendor-Neutral Architecture

## Status

Accepted

## Context

The primary goal of Gyon Platform is to deliver turn-by-turn navigation to a Huawei Watch Fit 4 Pro paired with an iPhone.

Map providers, routing engines, and platform APIs may change over time. Building directly against a single vendor would reduce portability and make long-term maintenance difficult.

## Decision

Gyon Platform adopts a vendor-neutral architecture.

All map, routing, and location services must be accessed through abstract contracts and provider interfaces.

The core domain must never depend directly on a specific vendor SDK or API.

## Consequences

### Positive

- Easier to support multiple providers.
- Better long-term maintainability.
- Reduced vendor lock-in.

### Negative

- Additional abstraction layers.
- Slightly higher implementation complexity.

## Alternatives Considered

- Direct integration with a single map provider.
- Vendor-specific domain models.
