"use client";

import { useState } from "react";
import ChannelList from "@/components/ChannelList";
import UserList from "@/components/UserList";
import MainContent from "@/components/RoomPage/MainContent";

export default function Home() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
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

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* 左侧频道列表 */}
      <div className="w-60 min-w-60 h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)]">
        <ChannelList
          activeChannel={activeChannel}
          onChannelSelect={setActiveChannel}
        />
      </div>

      {/* 中间主内容区 */}
      <div className="flex-1 h-full bg-[var(--bg-primary)]">
        <MainContent activeChannel={activeChannel} />
      </div>

      {/* 右侧用户列表 */}
      <div className="w-60 min-w-60 h-full bg-[var(--bg-secondary)] border-l border-[var(--border-color)]">
        <UserList users={users} currentUserId="local" />
      </div>
    </div>
  );
}
