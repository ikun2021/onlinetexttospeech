/**
 * Audio synthesis helper for voice preview
 * Uses browser Web Speech API with pitch & rate customization for each voice persona,
 * with fallback to Web Audio API harmonious tone synthesis.
 */

export function playVoiceSample(
  voiceId: string,
  text: string,
  lang: string = "zh-CN",
  onEnd?: () => void
): () => void {
  if (typeof window === "undefined") return () => {};

  // Try Web Speech API
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    // Customize voice characteristics based on voice ID
    switch (voiceId) {
      case "xiaoxiao":
        utterance.pitch = 1.25;
        utterance.rate = 1.0;
        break;
      case "yunxi":
        utterance.pitch = 0.78;
        utterance.rate = 0.95;
        break;
      case "alloy":
        utterance.pitch = 1.0;
        utterance.rate = 1.05;
        utterance.lang = "en-US";
        break;
      case "nova":
        utterance.pitch = 1.3;
        utterance.rate = 1.1;
        utterance.lang = "en-US";
        break;
      case "echo":
        utterance.pitch = 0.7;
        utterance.rate = 0.9;
        utterance.lang = "en-US";
        break;
      default:
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
    }

    // Try finding matching system voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const match = voices.find((v) =>
        voiceId === "alloy" || voiceId === "nova" || voiceId === "echo"
          ? v.lang.startsWith("en")
          : v.lang.startsWith("zh")
      );
      if (match) utterance.voice = match;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
      if (onEnd) onEnd();
    };
  }

  // Fallback: Web Audio synth tone chime
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const AudioContextClass = win.AudioContext || win.webkitAudioContext;
    if (!AudioContextClass) {
      if (onEnd) onEnd();
      return () => {};
    }
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(voiceId === "yunxi" || voiceId === "echo" ? 220 : 440, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);

    setTimeout(() => {
      if (onEnd) onEnd();
    }, 1200);

    return () => {
      try {
        osc.stop();
      } catch {}
      if (onEnd) onEnd();
    };
  } catch {
    if (onEnd) onEnd();
    return () => {};
  }
}
