import Foundation
import CoreLocation

final class LocationManager: NSObject, ObservableObject {
  static let shared = LocationManager()

  @Published private(set) var currentLocation: CLLocation?
  @Published private(set) var authorizationStatus: CLAuthorizationStatus = .notDetermined

  private let manager = CLLocationManager()

  private override init() {
    super.init()
    manager.delegate = self
    manager.desiredAccuracy = kCLLocationAccuracyBest
    manager.activityType = .fitness
    manager.allowsBackgroundLocationUpdates = true
    manager.pausesLocationUpdatesAutomatically = false
    manager.showsBackgroundLocationIndicator = true
  }

  func requestPermissions() {
    manager.requestAlwaysAuthorization()
  }

  func startUpdatingLocation() {
    manager.startUpdatingLocation()
  }

  func stopUpdatingLocation() {
    manager.stopUpdatingLocation()
  }
}

extension LocationManager: CLLocationManagerDelegate {
  func locationManager(
    _ manager: CLLocationManager,
    didChangeAuthorization status: CLAuthorizationStatus
  ) {
    authorizationStatus = status
  }

  func locationManager(
    _ manager: CLLocationManager,
    didUpdateLocations locations: [CLLocation]
  ) {
    guard let location = locations.last else { return }
    currentLocation = location
  }

  func locationManager(
    _ manager: CLLocationManager,
    didFailWithError error: Error
  ) {
    print("Location error: \(error.localizedDescription)")
  }
}
