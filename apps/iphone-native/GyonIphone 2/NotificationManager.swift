import Foundation
import UserNotifications

final class NotificationManager {
  static let shared = NotificationManager()

  private init() {}

  func requestPermissions(completion: @escaping (Bool) -> Void) {
    let center = UNUserNotificationCenter.current()
    center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, _ in
      completion(granted)
    }
  }

  func postNotification(id: String, title: String, subtitle: String?, body: String?, userInfo: [String: Any]? = nil) {
    let content = UNMutableNotificationContent()
    content.title = title
    if let subtitle = subtitle { content.subtitle = subtitle }
    if let body = body { content.body = body }
    if let info = userInfo { content.userInfo = info }

    // small attachment could be added later for icon

    let request = UNNotificationRequest(identifier: id, content: content, trigger: nil)
    UNUserNotificationCenter.current().add(request, withCompletionHandler: nil)
  }
}
