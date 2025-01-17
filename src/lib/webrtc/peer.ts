import socket from "../socket";

interface WebRTCManagerConfig {
  roomId: string;
  onStream?: (stream: MediaStream) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
}

export class WebRTCManager {
  private peerConnection: RTCPeerConnection;
  private roomId: string;

  constructor({
    roomId,
    onStream,
    onConnectionStateChange
  }: WebRTCManagerConfig) {
    this.roomId = roomId;
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    });

    this.peerConnection.ontrack = ({ streams }) => {
      onStream?.(streams[0]);
    };

    this.peerConnection.onconnectionstatechange = () => {
      onConnectionStateChange?.(this.peerConnection.connectionState);
    };

    this.initializeSocketListeners();
  }

  private initializeSocketListeners(): void {
    socket.emit("join-room", this.roomId);

    socket.on("ice-candidate", (candidate: RTCIceCandidate) => {
      this.peerConnection
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((err) => console.error("Error adding ice candidate:", err));
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: this.roomId
        });
      }
    };
  }

  async addStream(stream: MediaStream): Promise<void> {
    stream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, stream);
    });
  }

  // 其他方法...
}
