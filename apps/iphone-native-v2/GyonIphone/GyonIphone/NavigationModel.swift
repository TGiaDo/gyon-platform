import Foundation
import Combine
import CoreLocation
import MapKit

final class NavigationModel: NSObject, ObservableObject {
  @Published var authorizationStatusDescription = "Unknown"
  @Published var currentLocationDescription = "Unknown"
  @Published var canStartNavigation = false
  @Published var destinationDescription = ""
  @Published var nextInstruction: String = ""
  @Published var remainingDistance: Double = 0
  @Published var etaSeconds: Double = 0

  private let locationManager = LocationManager.shared
  private var cancellables = Set<AnyCancellable>()
  private let routeProvider = MapKitRouteProvider()
  private var currentRoute: NavigationRoute?
  private var simulationTimer: Timer?
  private var currentStepIndex = 0
  private var navigating = false
  private var rerouteThresholdMeters: Double = 40 // configurable
  private var destinationCoordinate: CLLocationCoordinate2D?

  override init() {
    super.init()
    observeLocation()
  }

  func start() {
    locationManager.requestPermissions()
    locationManager.startUpdatingLocation()
    NotificationManager.shared.requestPermissions { _ in }
  }

  private func observeLocation() {
    locationManager.$authorizationStatus
      .receive(on: DispatchQueue.main)
      .sink { [weak self] status in
        self?.authorizationStatusDescription = String(describing: status)
        self?.canStartNavigation = status == .authorizedAlways || status == .authorizedWhenInUse
      }
      .store(in: &cancellables)

    locationManager.$currentLocation
      .receive(on: DispatchQueue.main)
      .sink { [weak self] location in
        guard let location else { return }
        self?.currentLocationDescription = "Lat: \(location.coordinate.latitude), Lon: \(location.coordinate.longitude)"
      }
      .store(in: &cancellables)
  }

  func searchDestination(query: String, completion: @escaping (MKMapItem?) -> Void) {
    let request = MKLocalSearch.Request()
    request.naturalLanguageQuery = query
    if let loc = locationManager.currentLocation {
      request.region = MKCoordinateRegion(center: loc.coordinate, latitudinalMeters: 5000, longitudinalMeters: 5000)
    }
    let search = MKLocalSearch(request: request)
    search.start { response, error in
      completion(response?.mapItems.first)
    }
  }

  func calculateRoute(to item: MKMapItem, transport: MKDirectionsTransportType = .automobile) {
    guard let current = locationManager.currentLocation else { return }
    let from = current.coordinate
    let to = item.placemark.coordinate
    destinationDescription = item.name ?? "Destination"
    destinationCoordinate = to

    routeProvider.calculateRoute(from: from, to: to, transport: transport) { [weak self] result in
      DispatchQueue.main.async {
        switch result {
        case .success(let navRoute):
          self?.currentRoute = navRoute
          self?.remainingDistance = navRoute.distance
          self?.etaSeconds = navRoute.duration
          self?.currentStepIndex = 0
          if let first = navRoute.steps.first {
            self?.nextInstruction = first.maneuver
          }
        case .failure(let err):
          print("Route error: \(err)")
        }
      }
    }
  }
  func startNavigation() {
    guard let _ = currentRoute else { return }
    navigating = true
    currentStepIndex = 0

    // subscribe to location updates and process them
    locationManager.$currentLocation
      .receive(on: DispatchQueue.main)
      .sink { [weak self] location in
        guard let self = self, let loc = location else { return }
        self.processLocationUpdate(location: loc)
      }
      .store(in: &cancellables)
  }

  private func processLocationUpdate(location: CLLocation) {
    guard navigating, let route = currentRoute else { return }

    // find nearest step index
    var nearestIndex = 0
    var nearestDistance = Double.greatestFiniteMagnitude
    for (i, step) in route.steps.enumerated() {
      let coord = CLLocation(latitude: step.latitude, longitude: step.longitude)
      let d = coord.distance(from: location)
      if d < nearestDistance {
        nearestDistance = d
        nearestIndex = i
      }
    }

    // if we've advanced to a new maneuver, trigger output
    if nearestIndex != currentStepIndex {
      currentStepIndex = nearestIndex
      let step = route.steps[currentStepIndex]
      nextInstruction = step.maneuver
      remainingDistance = route.steps.suffix(from: currentStepIndex).map { $0.distance }.reduce(0, +)
      // update ETA approximately by scaling remaining distance proportionally
      etaSeconds = route.duration * (remainingDistance / max(1.0, route.distance))

      // notify and speak only on maneuver change
      NotificationManager.shared.postNotification(id: step.id, title: step.maneuver, subtitle: step.street, body: "Remaining: \(Int(remainingDistance)) m, ETA: \(Int(etaSeconds))s", userInfo: ["distance": step.distance])
      VoiceManager.shared.speak(step.maneuver)
    }

    // check arrival
    if currentStepIndex >= route.steps.count - 1 {
      let last = route.steps.last!
      let destLoc = CLLocation(latitude: last.latitude, longitude: last.longitude)
      if destLoc.distance(from: location) < 20 { // arrival threshold
        arrivalReached()
      }
    }

    // off-route detection: if nearest distance from any step is > threshold, reroute
    if nearestDistance > rerouteThresholdMeters {
      // request reroute from current location to destination
      if let dest = destinationCoordinate {
        let from = location.coordinate
        let to = dest
        routeProvider.calculateRoute(from: from, to: to) { [weak self] result in
          DispatchQueue.main.async {
            switch result {
            case .success(let newRoute):
              self?.currentRoute = newRoute
              self?.remainingDistance = newRoute.distance
              self?.etaSeconds = newRoute.duration
              self?.currentStepIndex = 0
              if let first = newRoute.steps.first {
                NotificationManager.shared.postNotification(id: first.id, title: "Rerouting", subtitle: first.street, body: "New route calculated", userInfo: nil)
                VoiceManager.shared.speak("Rerouting")
              }
            case .failure(let err):
              print("Reroute error: \(err)")
            }
          }
        }
      }
    }
  }

  private func arrivalReached() {
    nextInstruction = "Arrived"
    remainingDistance = 0
    etaSeconds = 0
    NotificationManager.shared.postNotification(id: "arrived", title: "Arrived", subtitle: destinationDescription, body: "You have arrived at your destination", userInfo: nil)
    VoiceManager.shared.speak("You have arrived at your destination")
  }
}

