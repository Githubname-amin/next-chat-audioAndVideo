"use client";

import { useMemo } from "react";
import VideoPlayer from "@/components/Video/VideoPlayer";
// import AudioPlayer from "../Audio/AudioPlayer";

interface Participant {
  id: string;
  name: string;
  stream?: MediaStream;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isSpeaking: boolean;
}

interface VideoGridProps {
  participants: any[];
  localStream: MediaStream | null;
}

export default function VideoGrid({
  participants,
  localStream
}: VideoGridProps) {
  // 获取开启视频的参与者
  const videoParticipants = useMemo(() => {
    return participants.filter((p) => p.isVideoEnabled);
  }, [participants]);

  // 获取只开启音频的参与者
  const audioOnlyParticipants = useMemo(() => {
    return participants.filter((p) => !p.isVideoEnabled && p.isAudioEnabled);
  }, [participants]);

  // 根据视频参与者数量决定布局
  const gridLayout = useMemo(() => {
    const count = videoParticipants.length;
    switch (count) {
      case 0:
        return "audio-only";
      case 1:
        return "single";
      case 2:
        return "double";
      case 3:
        return "triple";
      default:
        return "quad";
    }
  }, [videoParticipants.length]);

  return (
    <div className="h-full flex flex-col">
      {/* 视频网格区域 */}
      <div
        className={`
          w-full overflow-hidden
          ${gridLayout === "audio-only" ? "hidden" : ""}
          ${gridLayout === "single" ? "h-[85vh] p-4" : "h-[42vh] p-2"}
        `}
      >
        <div
          className={`
            h-full w-full grid gap-2
            ${gridLayout === "single" ? "grid-cols-1" : ""}
            ${gridLayout === "double" ? "grid-cols-2" : ""}
            ${gridLayout === "triple" ? "grid-cols-2 grid-rows-2" : ""}
            ${gridLayout === "quad" ? "grid-cols-2 grid-rows-2" : ""}
          `}
        >
          {/* 显示本地视频 */}
          {localStream && (
            <div className="relative bg-[var(--bg-tertiary)] rounded-lg overflow-hidden">
              <VideoPlayer
                stream={localStream}
                muted={true} // 本地视频必须静音以防止回声
              />
              <div className="absolute bottom-2 left-2 text-sm bg-black/50 px-2 py-1 rounded">
                我 (本地)
              </div>
            </div>
          )}
          {videoParticipants.map((participant, index) => (
            <div
              key={participant.id}
              className={`
                relative bg-[var(--bg-tertiary)] rounded-lg overflow-hidden
                ${gridLayout === "triple" && index === 0 ? "col-span-2" : ""}
                ${gridLayout === "single" ? "h-full" : "h-full"}
              `}
            >
              {participant.stream && (
                <VideoPlayer
                  stream={participant.stream}
                  muted={participant.id === "local"}
                />
              )}
              <div className="absolute bottom-2 left-2 text-sm bg-black/50 px-2 py-1 rounded">
                {participant.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 音频参与者列表 */}
      {/* <div className="h-20 min-h-20 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)]">
        <div className="flex items-center h-full px-4 gap-4 overflow-x-auto">
          {audioOnlyParticipants.map((participant) => (
            <div
              key={participant.id}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-full
                ${
                  participant.isSpeaking
                    ? "bg-[var(--bg-hover)] ring-2 ring-blue-500"
                    : "bg-[var(--bg-hover)]"
                }
              `}
            >
              <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                {participant.name[0]}
              </div>
              <span className="text-sm">{participant.name}</span>
              {participant.isSpeaking && (
                <div className="w-4 h-4">
                  <div className="animate-pulse w-full h-full rounded-full bg-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
