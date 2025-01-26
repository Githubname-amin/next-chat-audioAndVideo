"use client";

import { useState, useEffect, useCallback } from "react";
import VideoGrid from "../Video/VideoGrid";
import UserList from "../UserList";
import { useSocket } from "@/hooks/useSocket";
import { useMediaStream } from "@/hooks/useMediaStream";
// import { useRouter } from "next/navigation";

interface MainContentProps {
  activeChannel: string | null;
  onLeaveChannel?: () => void;
}

export default function MainContent({
  activeChannel,
  onLeaveChannel
}: MainContentProps) {
  // const router = useRouter();
  const { localStream, error, startLocalStream, stopLocalStream } =
    useMediaStream();
  const {
    isConnected,
    users,
    error: socketError,
    joinRoom,
    leaveRoom,
    userId
  } = useSocket(activeChannel);
  const [username] = useState(
    () => `User_${Math.random().toString(36).substr(2, 9)}`
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isConnected && activeChannel) {
      joinRoom(username);
    }

    return () => {
      if (activeChannel) {
        leaveRoom();
      }
    };
  }, [isConnected, activeChannel, joinRoom, leaveRoom, username]);

  // 处理开启本地视频
  const handleStartLocalVideo = async () => {
    try {
      if (!localStream) {
        await startLocalStream(true, true);
      }
    } catch (err) {
      // 可以添加一个 toast 提示或者其他 UI 反馈
      console.error("启动视频失败:", err);
      alert(err instanceof Error ? err.message : "启动视频失败");
    }
  };

  // 处理关闭本地视频
  const handleStopLocalVideo = () => {
    stopLocalStream();
  };

  // 修改视频切换处理函数
  const toggleUserVideo = (userId: string) => {
    if (userId === "local") {
      // 处理本地视频
      localStream ? handleStopLocalVideo() : handleStartLocalVideo();
    } else {
      // 处理其他用户视频（模拟）
      // 这里需要根据实际的用户管理逻辑来实现
    }
  };

  // 模拟切换用户音频状态
  const toggleUserAudio = (userId: string) => {
    // 这里需要根据实际的用户管理逻辑来实现
    console.log("toggleUserAudio", userId);
  };

  // 处理退出频道
  const handleLeaveRoom = useCallback(() => {
    try {
      leaveRoom();
      // 清理当前频道状态
      onLeaveChannel?.();
      // 不需要导航，因为是在同一页面切换状态
      // router.push("/");
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  }, [leaveRoom, onLeaveChannel]);

  if (!activeChannel) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-[var(--text-tertiary)]">
          请选择或创建一个房间
        </div>
      </div>
    );
  }

  if (socketError) {
    return <div>Error connecting to server: {socketError.message}</div>;
  }

  // 发送信息
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("发送消息:", message);
      setMessage("");
    }
  };

  return (
    <div className="h-full flex">
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 房间标题 */}
        <div className="h-12 bg-[var(--bg-tertiary)] flex items-center px-4 border-b border-[var(--border-color)]">
          <h1 className="font-medium">{activeChannel}</h1>
          <button
            onClick={handleLeaveRoom}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 transition-colors"
          >
            退出频{userId}道
          </button>
        </div>

        {/* 视频网格 - 传入本地流 */}
        <div className="flex-1 overflow-hidden">
          <VideoGrid
            participants={users.filter((u) => u.isVideoEnabled)}
            localStream={localStream}
          />
        </div>

        {/* 底部控制栏 */}
        <div className="h-16 bg-[var(--bg-tertiary)] border-t border-[var(--border-color)] flex items-center px-4 gap-4">
          {/* 测试按钮组 */}
          <div className="flex gap-2">
            {users.map((user) => (
              <div key={user.id} className="flex gap-1">
                <button
                  onClick={() => toggleUserVideo(user.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    user.isVideoEnabled ? "bg-blue-600" : "bg-[var(--bg-hover)]"
                  }`}
                >
                  {user.username} 视频
                </button>
                <button
                  onClick={() => toggleUserAudio(user.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    user.isAudioEnabled ? "bg-blue-600" : "bg-[var(--bg-hover)]"
                  }`}
                >
                  {user.username} 音频
                </button>
              </div>
            ))}
          </div>

          {/* 消息输入框 */}
          <form onSubmit={handleSendMessage} className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="发送消息..."
              className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-2 rounded border border-[var(--border-color)] focus:outline-none focus:border-[var(--bg-hover)]"
            />
          </form>
        </div>
      </div>

      {/* 右侧用户列表 */}
      <div className="w-60 border-l border-[var(--border-color)]">
        <UserList users={users} currentUserId={userId} />
      </div>

      {/* 添加错误提示 */}
      {error && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow">
          {error}
        </div>
      )}
    </div>
  );
}
