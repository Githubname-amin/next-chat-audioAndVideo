import { SocketEvent } from "@/types/socket";

export class SocketManager {
  private static instance: SocketManager;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  private constructor() {
    // 私有构造函数，确保单例
  }

  static getInstance(): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
    }
    return SocketManager.instance;
  }

  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
          console.log("WebSocket connected");
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          resolve();
        };

        this.socket.onclose = () => {
          console.log("WebSocket closed");
          this.handleDisconnect();
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event.data);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect(this.socket?.url || "");
      }, this.reconnectTimeout * Math.pow(2, this.reconnectAttempts));
    }
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.send({ type: "PING" });
    }, 30000);
  }

  private handleMessage(data: string) {
    try {
      const event = JSON.parse(data) as SocketEvent;
      // 处理不同类型的消息
      switch (event.type) {
        case "USER_JOINED":
          // 处理用户加入
          break;
        case "USER_LEFT":
          // 处理用户离开
          break;
        // ... 其他消息类型
      }
    } catch (error) {
      console.error("Failed to parse message:", error);
    }
  }

  send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not connected");
    }
  }

  disconnect() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}
