import { useEffect, useState, useCallback } from "react";
import { SocketService } from "@/services/socketService";
import {
  User,
  // RoomJoinPayload,
  // ChannelState,
  ChatMessage
} from "@/types/socket";

export function useSocket(channelId: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>("");
  const socketService = SocketService.getInstance();

  // 监听用户ID和连接状态
  useEffect(() => {
    const socket = socketService.connect();
    if (!socket) return;

    socket.on("connect", () => {
      setIsConnected(true);
      setError(null);
    });

    socket.on("user-connected", (data: { userId: string }) => {
      console.log("User connected, userId:", data.userId);
      setUserId(data.userId);
    });

    socket.on("join-room-success", (data: { userId: string }) => {
      console.log("Join room success, userId:", data.userId);
      setUserId(data.userId);
    });

    return () => {
      socket.off("connect");
      socket.off("user-connected");
      socket.off("join-room-success");
    };
  }, []);

  // 初始化连接和状态
  useEffect(() => {
    if (channelId) {
      try {
        const socket = socketService.connect();

        if (socket) {
          // 房间用户列表更新
          socket.on("room-users", (roomUsers: User[]) => {
            setUsers(roomUsers);
            setIsLoading(false);
          });

          // 新用户加入
          socket.on("user-joined", (user: User) => {
            setUsers((prev) => [...prev, user]);
          });

          // 用户离开
          socket.on("user-left", (userId: string) => {
            setUsers((prev) => prev.filter((user) => user.id !== userId));
          });

          // 监听新消息
          socket.on("new-message", (message: ChatMessage) => {
            setMessages((prev) => [...prev, message]);
          });

          // 监听历史消息
          socket.on("chat-history", (history: ChatMessage[]) => {
            setMessages(history);
          });
        }

        return () => {
          socketService.disconnect();
        };
      } catch (err) {
        setError(err as Error);
      }
    }
  }, [channelId]);

  // 清理本地状态
  const clearLocalState = useCallback(() => {
    setUsers([]);
    setMessages([]);
    setUserId("");
    socketService.setUserIdClear("");
  }, []);

  // 加入房间
  const joinRoom = useCallback(
    (username: string) => {
      const socket = socketService.connect();
      if (!socket || !channelId) return;
      socket.emit("join-room", { roomId: channelId, username });
    },
    [channelId]
  );

  // 离开房间
  const leaveRoom = useCallback(() => {
    const socket = socketService.connect();
    if (!socket) return;

    try {
      socket.emit("leave-room");
      clearLocalState();

      // 可以添加导航逻辑，比如返回首页
      // router.push('/');
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  }, [clearLocalState]);

  // 监听其他用户离开
  useEffect(() => {
    const socket = socketService.connect();
    if (!socket) return;

    socket.on("user-left", ({ userId, username }) => {
      console.log(`用户 ${username}(${userId}) 已离开频道`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));

      // 如果有 WebRTC 连接，需要清理
      // closeRTCConnection(userId);
    });

    // 组件卸载时自动离开房间
    return () => {
      socket.emit("leave-room");
      socket.off("user-left");
      clearLocalState();
    };
  }, [clearLocalState]);

  return {
    isConnected,
    isLoading,
    users,
    messages,
    error,
    userId,
    joinRoom,
    leaveRoom
  };
}
