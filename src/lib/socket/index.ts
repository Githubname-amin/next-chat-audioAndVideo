import { io } from "socket.io-client";

// 创建 Socket 实例
export const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000",
  {
    path: "/api/socketio"
  }
);

// 添加连接事件监听
socket.on("connect", () => {
  console.log("Socket connected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

export default socket;
