"use client";

import { useState } from "react";
import VideoGrid from "../Video/VideoGrid";
import UserList from "../UserList";

interface MainContentProps {
  activeChannel: string | null;
}

export default function MainContent({ activeChannel }: MainContentProps) {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([
    {
      id: "local",
      name: "我",
      status: "在线" as const,
      isVideoEnabled: false,
      isAudioEnabled: true,
      isSpeaking: false
    },
    {
      id: "user1",
      name: "User 1",
      status: "在线" as const,
      isVideoEnabled: false,
      isAudioEnabled: true,
      isSpeaking: false
    },
    {
      id: "user2",
      name: "User 2",
      status: "离开" as const,
      isVideoEnabled: false,
      isAudioEnabled: false,
      isSpeaking: false
    }
  ]);

  // 处理消息发送
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("发送消息:", message);
      setMessage("");
    }
  };

  // 模拟切换用户视频状态
  const toggleUserVideo = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isVideoEnabled: !user.isVideoEnabled }
          : user
      )
    );
  };

  // 模拟切换用户音频状态
  const toggleUserAudio = (userId: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, isAudioEnabled: !user.isAudioEnabled }
          : user
      )
    );
  };

  if (!activeChannel) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-[var(--text-tertiary)]">
          请选择或创建一个房间
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 房间标题 */}
        <div className="h-12 bg-[var(--bg-tertiary)] flex items-center px-4 border-b border-[var(--border-color)]">
          <h1 className="font-medium">{activeChannel}</h1>
        </div>

        {/* 视频网格 */}
        <div className="flex-1 overflow-hidden">
          <VideoGrid participants={users.filter((u) => u.isVideoEnabled)} />
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
                  {user.name} 视频
                </button>
                <button
                  onClick={() => toggleUserAudio(user.id)}
                  className={`px-3 py-1 rounded text-sm ${
                    user.isAudioEnabled ? "bg-blue-600" : "bg-[var(--bg-hover)]"
                  }`}
                >
                  {user.name} 音频
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
        <UserList users={users} currentUserId="local" />
      </div>
    </div>
  );
}
