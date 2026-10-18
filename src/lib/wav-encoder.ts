/**
 * Simple in-browser WAV audio generator
 * Synthesizes harmonic speech-like frequency tones and exports as a valid playable WAV file.
 */

export function createWavBlob(durationSeconds: number, baseFreq: number = 260): Blob {
  const sampleRate = 44100;
  const numChannels = 1;
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const blockAlign = numChannels * 2;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;

  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Write WAV header
  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // BitsPerSample
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Generate pleasant harmonic speech-like audio signal
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Envelope for natural fade-in and fade-out
    const envelope = Math.min(1, Math.min(t * 8, (durationSeconds - t) * 8));
    // Modulated fundamental + harmonics
    const f0 = baseFreq + Math.sin(t * 4) * 20;
    const sample =
      (Math.sin(2 * Math.PI * f0 * t) * 0.6 +
        Math.sin(2 * Math.PI * f0 * 2 * t) * 0.25 +
        Math.sin(2 * Math.PI * f0 * 3 * t) * 0.15) *
      envelope *
      0.35;

    // Convert to 16-bit PCM
    const pcm = Math.max(-1, Math.min(1, sample)) * 0x7fff;
    view.setInt16(offset, pcm, true);
    offset += 2;
  }

  return new Blob([view], { type: "audio/wav" });
}
