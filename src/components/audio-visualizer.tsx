"use client";

import React, { useRef, useEffect } from "react";

interface AudioVisualizerProps {
  stream?: MediaStream | null;
  isSimulating?: boolean;
  barColor?: string;
  height?: number;
}

export function AudioVisualizer({
  stream,
  isSimulating = false,
  barColor,
  height = 70,
}: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let dataArray: Uint8Array | null = null;

    if (stream) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        const AudioContextClass = win.AudioContext || win.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctxInstance = new AudioContextClass();
        const analyserNode = ctxInstance.createAnalyser();
        analyserNode.fftSize = 64;
        const sourceNode = ctxInstance.createMediaStreamSource(stream);
        sourceNode.connect(analyserNode);

        audioCtx = ctxInstance;
        analyser = analyserNode;
        source = sourceNode;

        const bufferLength = analyserNode.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
      } catch (err) {
        console.warn("AudioContext setup error:", err);
      }
    }

    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);

      const numBars = 36;
      const barWidth = 3;
      const totalBarWidth = numBars * barWidth;
      const gap = (width - totalBarWidth) / (numBars - 1);

      if (analyser && dataArray) {
        // Real-time microphone data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        analyser.getByteFrequencyData(dataArray as any);
        for (let i = 0; i < numBars; i++) {
          const dataIndex = Math.floor((i / numBars) * dataArray.length);
          const value = dataArray[dataIndex] || 0;
          const percent = value / 255;
          const barHeight = Math.max(4, percent * (h - 8));

          const x = i * (barWidth + gap);
          const y = (h - barHeight) / 2;

          ctx.fillStyle = barColor || (document.documentElement.classList.contains("dark") ? "#ededed" : "#18181b");
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      } else if (isSimulating) {
        // Realistic dynamic pulse simulation
        phase += 0.08;
        for (let i = 0; i < numBars; i++) {
          const wave1 = Math.sin(phase + i * 0.25);
          const wave2 = Math.cos(phase * 1.5 + i * 0.15);
          const combined = (wave1 + wave2 + 2) / 4;
          const barHeight = Math.max(4, combined * (h * 0.75));

          const x = i * (barWidth + gap);
          const y = (h - barHeight) / 2;

          ctx.fillStyle = barColor || "#0070f3";
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      } else {
        // Idle gentle waveform
        for (let i = 0; i < numBars; i++) {
          const barHeight = 4;
          const x = i * (barWidth + gap);
          const y = (h - barHeight) / 2;

          ctx.fillStyle = document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.15)"
            : "rgba(0, 0, 0, 0.15)";
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (source) source.disconnect();
      if (analyser) analyser.disconnect();
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(() => {});
      }
    };
  }, [stream, isSimulating, barColor, height]);

  return (
    <div className="w-full flex items-center justify-center py-2">
      <canvas
        ref={canvasRef}
        width={360}
        height={height}
        className="w-full max-w-sm h-auto block"
      />
    </div>
  );
}
