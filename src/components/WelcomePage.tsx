"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const recommendedRooms = [
    {
      id: "music",
      name: "音乐交流室",
      icon: "🎵",
      desc: "与音乐爱好者实时交流",
      participants: 3,
      isHot: true
    },
    {
      id: "english",
      name: "英语角",
      icon: "🗣",
      desc: "练习英语口语对话",
      participants: 2,
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-[var(--kook-bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">欢迎来到实时对话广场</h1>
          <p className="text-[var(--kook-text-secondary)]">
            选择一个房间开始交流，或创建自己的房间
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedRooms.map((room) => (
            <div
              key={room.id}
              onClick={() => router.push(`/room/${room.id}`)}
              className="group relative bg-[var(--kook-bg-secondary)] rounded-lg p-6 kook-interactive"
            >
              {/* 热门/新房间标签 */}
              {room.isHot && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs rounded">
                  热门
                </div>
              )}
              {room.isNew && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs rounded">
                  新房间
                </div>
              )}

              <div className="flex items-start mb-4">
                <span className="text-3xl mr-4">{room.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{room.name}</h3>
                  <p className="text-[var(--kook-text-secondary)]">
                    {room.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--kook-text-tertiary)]">
                  当前在线: {room.participants} 人
                </span>
                <button className="px-4 py-2 bg-[var(--kook-accent)] text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  加入房间
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center p-8 bg-[var(--kook-bg-secondary)] rounded-lg">
          <h3 className="text-xl font-semibold mb-2">创建自己的房间</h3>
          <p className="text-[var(--kook-text-secondary)] mb-4">
            创建专属于你的对话空间，邀请好友加入
          </p>
          <button
            onClick={() => router.push("/create-room")}
            className="px-6 py-3 bg-[var(--kook-accent)] text-white rounded-md hover:bg-[var(--kook-accent-hover)] transition-colors"
          >
            创建新房间
          </button>
        </div>
      </div>
    </div>
  );
}
