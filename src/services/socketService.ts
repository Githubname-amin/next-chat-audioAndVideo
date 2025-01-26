import { User } from "@/types/user";
import { io, Socket } from "socket.io-client";

export class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private roomId: string | null = null;
  private userId: string = "";

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect() {
    if (this.socket?.connected) return this.socket;

    this.socket = io(
      "http://localhost:3001",
      // "http://192.168.2.3:3001",
      {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      }
    );

    this.setupListeners();
    return this.socket;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server", this.socket);
    });

    this.socket.on("disconnect", () => {
      console.log("与服务器断开连接");
    });

    this.socket.on("error", (error) => {
      console.error("WebSocket 错误:", error);
    });

    this.socket.on("user-connected", (data: { userId: string }) => {
      console.log("Received userId:", data.userId);
      this.userId = data.userId;
      this.socket?.emit("local-user-id-updated", data.userId);
    });
  }

  joinRoom(roomId: string, userData: User) {
    if (!this.socket) return;
    this.roomId = roomId;
    this.socket.emit("join-room", roomId, userData);
  }

  leaveRoom() {
    if (!this.socket || !this.roomId) return;
    this.socket.emit("leave-room", this.roomId);
    this.roomId = null;
  }

  sendVideoStream(stream: MediaStream) {
    if (!this.socket || !this.roomId) return;
    this.socket.emit("video-stream", this.roomId, stream);
  }

  onUserJoined(callback: (userData: User) => void) {
    this.socket?.on("user-joined", callback);
  }

  onUserLeft(callback: (userId: string) => void) {
    this.socket?.on("user-left", callback);
  }

  onVideoStream(
    callback: (data: { userId: string; stream: MediaStream }) => void
  ) {
    this.socket?.on("video-stream", callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  setUserIdClear(id: string) {
    this.userId = id;
    console.log("SocketService: userId updated:", id);
  }

  getUserId(): string {
    return this.userId;
  }
}
