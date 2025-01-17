"use client";

import { useRouter } from "next/navigation";

interface RoomCardProps {
  room: {
    id: string;
    name: string;
    participants: number;
  };
}

export default function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`/room/${room.id}`);
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{room.name}</h3>
      <p className="text-gray-600">房间号: {room.id}</p>
      <p className="text-sm text-gray-500">当前参与人数: {room.participants}</p>
      <button
        onClick={handleJoinRoom}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
      >
        加入房间
      </button>
    </div>
  );
}
