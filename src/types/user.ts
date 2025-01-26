export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string; // 可选的头像URL
  status: "online" | "offline";
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isSpeaking: boolean;
  bio?: string; // 
}

export interface RoomUser extends User {
  socketId?: string; // WebSocket 连接 ID
}
