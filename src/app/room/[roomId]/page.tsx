"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";
import VideoPlayer from "@/components/Video/VideoPlayer";
import ClientOnly from "@/components/ClientOnly";
import { useSocket } from "@/hooks/useSocket";

export default function Room() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const {
    isConnected,
    isLoading,
    users,
    messages,
    error,
    userId,
    joinRoom,
    leaveRoom
  } = useSocket(roomId);

  useEffect(() => {
    console.log("Current userId in Room:", userId);
  }, [userId]); // 监听 userId 变化

  useEffect(() => {
    const initStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setLocalStream(stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initStream();
  }, []);

  // 处理组件卸载
  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, [leaveRoom]);

  // 处理加载状态
  if (isLoading) {
    return (
      <ClientOnly>
        <div className="flex min-h-screen bg-gray-800 items-center justify-center">
          <div className="text-white">加载频道信息中...</div>
        </div>
      </ClientOnly>
    );
  }

  // 处理错误状态
  if (error) {
    return (
      <ClientOnly>
        <div className="flex min-h-screen bg-gray-800 items-center justify-center">
          <div className="text-red-500">错误: {error.message}</div>
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className="flex min-h-screen bg-gray-800">
        <Sidebar activeRoom={roomId} />

        <main className="flex-1 ml-60 mr-60 p-4 text-white">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">我的画面</h3>
              <VideoPlayer stream={localStream} muted />
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">对方画面</h3>
              <div className="aspect-video bg-gray-800 rounded flex items-center justify-center">
                等待对方加入...
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded-lg h-64 overflow-y-auto">
            {messages.map((message) => (
              <div key={message.id} className="mb-2">
                <span className="font-bold">{message.username}: </span>
                <span>{message.content}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                开始录制
              </button>
              <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
                开启翻译
              </button>
            </div>
          </div>
        </main>

        <UserList users={users} currentUserId={userId} />
      </div>
    </ClientOnly>
  );
}
