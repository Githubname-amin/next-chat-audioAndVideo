export interface User {
  id: string;
  username: string;
  roomId?: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

export interface RoomJoinPayload {
  roomId: string;
  username: string;
}

export interface RoomState {
  users: User[];
}

export interface ChannelState {
  users: User[];
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: string;
  type: "text" | "system";
}

// WebSocket 事件类型
export type SocketEventMap = {
  connect: () => void;
  disconnect: () => void;
  "join-room": (payload: RoomJoinPayload) => void;
  "room-users": (users: User[]) => void;
  "user-joined": (user: User) => void;
  "user-left": (userId: string) => void;
  "channel-state": (state: ChannelState) => void;
  "chat-history": (messages: ChatMessage[]) => void;
  // ... 其他事件类型
};

export type SocketEvent =
  | { type: "JOIN_ROOM"; payload: { roomId: string; user: User } }
  | { type: "LEAVE_ROOM"; payload: { roomId: string; userId: string } }
  | {
      type: "MEDIA_START";
      payload: { userId: string; mediaType: "video" | "audio" };
    }
  | {
      type: "MEDIA_STOP";
      payload: { userId: string; mediaType: "video" | "audio" };
    }
  | { type: "USER_JOINED"; payload: { user: User } }
  | { type: "USER_LEFT"; payload: { userId: string } }
  | { type: "ERROR"; payload: { message: string } };
