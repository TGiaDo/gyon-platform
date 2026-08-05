import Foundation
import AVFoundation

final class VoiceManager {
  static let shared = VoiceManager()

  private let synthesizer = AVSpeechSynthesizer()

  private init() {}

  func speak(_ text: String) {
      let utterance = AVSpeechUtterance(string: text)
      utterance.rate = AVSpeechUtteranceDefaultSpeechRate
      utterance.voice = AVSpeechSynthesisVoice(language: "vi-VN")
      synthesizer.speak(utterance)
  }
}
