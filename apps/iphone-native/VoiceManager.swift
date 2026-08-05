import Foundation
import AVFoundation

final class VoiceManager {
  static let shared = VoiceManager()

  private let synthesizer = AVSpeechSynthesizer()

  private init() {}

  func speak(_ text: String) {
    let utterance = AVSpeechUtterance(string: text)
    utterance.rate = AVSpeechUtteranceDefaultSpeechRate
    utterance.voice = AVSpeechSynthesisVoice(language: Locale.current.languageCode ?? "en-US")
    synthesizer.speak(utterance)
  }
}
