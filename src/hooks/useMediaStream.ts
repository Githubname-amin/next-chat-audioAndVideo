import { useState, useCallback } from "react";

export function useMediaStream() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 检查浏览器媒体设备支持情况
  const checkMediaDevicesSupport = () => {
    console.log("checkMediaDevicesSupport", navigator);
    // 确保 mediaDevices 对象存在
    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {} as any;
    }
    // 处理不同浏览器的 getUserMedia 实现
    if (!navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 获取旧版的 getUserMedia
        const getUserMedia = (
          navigator.getUserMedia ||
          (navigator as any).webkitGetUserMedia ||
          (navigator as any).mozGetUserMedia ||
          (navigator as any).msGetUserMedia
        )?.bind(navigator);

        // 如果都不存在，抛出错误
        if (!getUserMedia) {
          return Promise.reject(
            new Error(
              "您的浏览器不支持媒体设备访问，请使用最新版本的Chrome、Firefox或Safari浏览器"
            )
          );
        }

        // 将旧版 API 包装为 Promise
        return new Promise((resolve, reject) => {
          getUserMedia(constraints, resolve, reject);
        });
      };
    }

    // 开发环境允许 HTTP
    const isDevelopment = process.env.NODE_ENV === "development";
    if (
      !isDevelopment &&
      window.location.protocol !== "https:" &&
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "192.168.2.3" // 允许本地 IP 访问
    ) {
      throw new Error("媒体设备访问需要使用 HTTPS 协议，请使用 HTTPS 访问本站");
    }
  };

  const startLocalStream = useCallback(
    async (video: boolean = true, audio: boolean = true) => {
      try {
        // 首先检查并设置浏览器支持
        checkMediaDevicesSupport();

        // 尝试获取媒体流
        const stream = await navigator.mediaDevices.getUserMedia({
          video: video
            ? {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: "user" // 默认使用前置摄像头
              }
            : false,
          audio: audio
            ? {
                echoCancellation: true, // 回声消除
                noiseSuppression: true, // 噪声抑制
                autoGainControl: true // 自动增益
              }
            : false
        });

        setLocalStream(stream);
        setError(null);
        return stream;
      } catch (err) {
        let errorMessage = "获取媒体设备失败";

        if (err instanceof Error) {
          switch (err.name) {
            case "NotFoundError":
              errorMessage =
                "找不到媒体设备，请确认您的设备已连接摄像头和麦克风";
              break;
            case "NotAllowedError":
            case "PermissionDeniedError":
              errorMessage = "请允许访问摄像头和麦克风权限";
              break;
            case "ConstraintNotSatisfiedError":
              errorMessage = "您的设备不满足要求，请尝试使用其他摄像头或麦克风";
              break;
            case "NotSupportedError":
              errorMessage = "您的浏览器不支持所请求的媒体类型";
              break;
            case "NotReadableError":
              errorMessage =
                "无法访问媒体设备，请确保没有其他应用正在使用该设备";
              break;
            default:
              errorMessage = err.message;
          }
        }

        setError(errorMessage);
        console.error("媒体设备错误:", errorMessage);
        throw new Error(errorMessage);
      }
    },
    []
  );

  const stopLocalStream = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
  }, [localStream]);

  const toggleVideo = useCallback(async () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }, [localStream]);

  const toggleAudio = useCallback(async () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }, [localStream]);

  return {
    localStream,
    error,
    startLocalStream,
    stopLocalStream,
    toggleVideo,
    toggleAudio
  };
}
