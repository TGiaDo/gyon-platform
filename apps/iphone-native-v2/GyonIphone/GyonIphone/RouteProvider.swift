import Foundation
import CoreLocation
import MapKit

struct NavigationStep: Codable {
  let id: String
  let maneuver: String
  let distance: Double
  let duration: Double
  let latitude: Double
  let longitude: Double
  let street: String
}

struct NavigationRoute: Codable {
  let distance: Double
  let duration: Double
  let steps: [NavigationStep]
}

/// Uses MapKit to calculate routes and convert them to NavigationRoute.
final class MapKitRouteProvider {

  func calculateRoute(
    from: CLLocationCoordinate2D,
    to: CLLocationCoordinate2D,
    transport: MKDirectionsTransportType = .automobile,
    completion: @escaping (Result<NavigationRoute, Error>) -> Void
  ) {

    let sourcePlacemark = MKPlacemark(coordinate: from)
    let destPlacemark = MKPlacemark(coordinate: to)

    let request = MKDirections.Request()
    request.source = MKMapItem(placemark: sourcePlacemark)
    request.destination = MKMapItem(placemark: destPlacemark)
    request.transportType = transport
    request.requestsAlternateRoutes = false

    let directions = MKDirections(request: request)
    directions.calculate { response, error in
      if let error = error {
        completion(.failure(error))
        return
      }

      guard let route = response?.routes.first else {
        completion(.failure(NSError(domain: "RouteError", code: 1, userInfo: [NSLocalizedDescriptionKey: "No route found"])))
        return
      }

      // Convert MKRoute to NavigationRoute
      let steps: [NavigationStep] = route.steps.map { step in
        let coord = step.polyline.coordinate
        let street = step.instructions.isEmpty ? "" : step.instructions
        return NavigationStep(
          id: UUID().uuidString,
          maneuver: step.instructions.isEmpty ? "continue" : step.instructions,
          distance: step.distance,
          duration: route.expectedTravelTime * (step.distance / route.distance),
          latitude: coord.latitude,
          longitude: coord.longitude,
          street: street
        )
      }

      let navRoute = NavigationRoute(
        distance: route.distance,
        duration: route.expectedTravelTime,
        steps: steps
      )

      completion(.success(navRoute))
    }
  }
}
