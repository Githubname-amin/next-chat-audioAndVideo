"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream: MediaStream;
  muted?: boolean;
  className?: string;
}

export default function VideoPlayer({
  stream,
  muted = false,
  className = ""
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;

      // 尝试自动播放
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.error("视频自动播放失败:", error);
        }
      };

      playVideo();
    }

    // 清理函数
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted={muted}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
