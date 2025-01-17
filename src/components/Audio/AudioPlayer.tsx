"use client";

interface AudioPlayerProps {
  stream: MediaStream | null;
  muted?: boolean;
  volume?: number;
}

export default function AudioPlayer({
  stream,
  muted = false,
  volume = 1
}: AudioPlayerProps) {
  return (
    <div className="audio-player">
      <audio
        autoPlay
        ref={(audioElement) => {
          if (audioElement && stream) {
            audioElement.srcObject = stream;
            audioElement.muted = muted;
            audioElement.volume = volume;
          }
        }}
      />
      <div className="flex items-center gap-2 p-2 bg-gray-100 rounded">
        <div
          className={`w-3 h-3 rounded-full ${
            stream ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {stream ? "音频已连接" : "等待音频连接..."}
        </span>
      </div>
    </div>
  );
}
