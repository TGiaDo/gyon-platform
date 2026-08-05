# ADR-0003: Phone-Centric Navigation Architecture

## Status

Accepted

## Context

The primary objective of Gyon Maps is to deliver navigation guidance to a Huawei Watch Fit 4 Pro paired with an iPhone.

Navigation requires route calculation, location updates, rerouting, and synchronization across multiple devices.

A single source of truth is required to keep the navigation state consistent.

## Decision

The phone is the Navigation Host.

A Navigation Session lives on the phone and is the single source of truth.

Responsibilities of the phone include:

- Route calculation
- Location tracking
- Navigation state
- Rerouting
- Synchronization with connected devices

Connected devices receive navigation updates but do not own the navigation session.

## Consequences

### Positive

- Single source of truth.
- Easier synchronization.
- Supports multiple companion devices.
- Reduced platform-specific complexity.

### Negative

- Companion devices depend on the phone connection.
- Additional synchronization logic is required.

## Alternatives Considered

- Independent navigation sessions on each device.
- Watch-owned navigation session.
