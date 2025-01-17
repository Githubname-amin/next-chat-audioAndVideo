"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  activeRoom?: string;
}

export default function Sidebar({ activeRoom }: SidebarProps) {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const rooms = {
    recommended: [
      {
        id: "music",
        name: "音乐交流室",
        icon: "🎵",
        desc: "与音乐爱好者实时交流",
        participants: 3,
        isActive: true
      },
      {
        id: "english",
        name: "英语角",
        icon: "🗣",
        desc: "练习英语口语对话",
        participants: 2,
        isActive: true
      }
    ],
    personal: [
      {
        id: "my-room-1",
        name: "我的房间1",
        icon: "🏠",
        desc: "个人创建的房间",
        participants: 1,
        isActive: false
      }
    ]
  };

  return (
    <nav className="w-60 h-screen fixed left-0 top-0 flex flex-col bg-[var(--kook-bg-secondary)] border-r border-[var(--kook-border)]">
      {/* 顶部标题栏 */}
      <div className="h-12 flex items-center px-4 bg-[var(--kook-bg-tertiary)] border-b border-[var(--kook-border)]">
        <h2 className="font-semibold">实时对话广场</h2>
      </div>

      {/* 房间列表区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 推荐房间 */}
        <div className="py-4">
          <div className="px-4 mb-2 text-xs text-[var(--kook-text-tertiary)] uppercase tracking-wider">
            推荐房间
          </div>
          {rooms.recommended.map((room) => (
            <div
              key={room.id}
              onClick={() => router.push(`/room/${room.id}`)}
              className={`
                group px-3 py-2 mx-2 rounded-md kook-interactive
                ${
                  activeRoom === room.id
                    ? "bg-[var(--kook-accent)] text-white"
                    : ""
                }
                ${room.isActive ? "kook-active-indicator" : ""}
              `}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{room.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{room.name}</span>
                    <span className="text-xs text-[var(--kook-text-tertiary)] group-hover:text-[var(--kook-text-secondary)]">
                      {room.participants}人
                    </span>
                  </div>
                  <div className="text-xs text-[var(--kook-text-tertiary)] group-hover:text-[var(--kook-text-secondary)]">
                    {room.desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 我的房间 */}
        <div className="py-4">
          <div className="px-4 mb-2 text-xs text-[var(--kook-text-tertiary)] uppercase tracking-wider flex items-center justify-between">
            <span>我的房间</span>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-[var(--kook-accent)] hover:text-[var(--kook-accent-hover)]"
            >
              ＋ 新建
            </button>
          </div>
          {rooms.personal.map((room) => (
            <div
              key={room.id}
              onClick={() => router.push(`/room/${room.id}`)}
              className={`
                group px-3 py-2 mx-2 rounded-md kook-interactive
                ${
                  activeRoom === room.id
                    ? "bg-[var(--kook-accent)] text-white"
                    : ""
                }
              `}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{room.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{room.name}</span>
                    <span className="text-xs text-[var(--kook-text-tertiary)] group-hover:text-[var(--kook-text-secondary)]">
                      {room.participants}人
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部用户信息 */}
      <div className="h-14 px-4 flex items-center bg-[var(--kook-bg-tertiary)] border-t border-[var(--kook-border)]">
        <div className="w-8 h-8 rounded-full bg-[var(--kook-accent)] flex items-center justify-center mr-3">
          <span className="text-sm">访</span>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">访客用户</div>
          <div className="text-xs text-[var(--kook-text-tertiary)]">在线</div>
        </div>
      </div>
    </nav>
  );
}
