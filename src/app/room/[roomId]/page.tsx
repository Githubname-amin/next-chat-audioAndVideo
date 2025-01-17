"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";
import VideoPlayer from "@/components/Video/VideoPlayer";
import ClientOnly from "@/components/ClientOnly";

export default function Room() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // 模拟用户数据
  const users = [
    {
      id: "1",
      name: "User 1",
      status: "在线",
      isVideoEnabled: true,
      isAudioEnabled: true,
      isSpeaking: false
    },
    {
      id: "2",
      name: "User 2",
      status: "在线",
      isVideoEnabled: true,
      isAudioEnabled: true,
      isSpeaking: false
    },
    {
      id: "3",
      name: "User 3",
      status: "离开",
      isVideoEnabled: false,
      isAudioEnabled: false,
      isSpeaking: false
    }
  ];

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

        <UserList users={users} currentUserId="local" />
      </div>
    </ClientOnly>
  );
}
