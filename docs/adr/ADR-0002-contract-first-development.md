# ADR-0002: Contract-First Development

## Status

Accepted

## Context

Multiple packages will share common domain models and interfaces.

Without a shared contract layer, packages may drift apart and introduce incompatible APIs.

## Decision

Contracts are defined before implementations.

Every provider, engine, and application must depend on shared contracts instead of defining their own public models.

## Consequences

### Positive

- Consistent APIs.
- Easier testing.
- Better package boundaries.

### Negative

- Requires additional design effort before implementation.

## Alternatives Considered

- Code-first development.
- Independent models in each package.
