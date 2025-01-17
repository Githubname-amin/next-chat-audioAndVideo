import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false
  }
};

interface IOServer extends NetServer {
  io?: ServerIO;
}

interface SocketRequest extends NextApiRequest {
  socket: IOServer;
}

const ioHandler = (req: SocketRequest, res: NextApiResponse) => {
  if (!req.socket.io) {
    const io = new ServerIO(req.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false
    });

    req.socket.io = io;

    io.on("connection", (socket) => {
      socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
      });

      socket.on(
        "ice-candidate",
        (data: { candidate: RTCIceCandidate; roomId: string }) => {
          socket.to(data.roomId).emit("ice-candidate", data.candidate);
        }
      );

      socket.on(
        "offer",
        (data: { offer: RTCSessionDescriptionInit; roomId: string }) => {
          socket.to(data.roomId).emit("offer", data.offer);
        }
      );

      socket.on(
        "answer",
        (data: { answer: RTCSessionDescriptionInit; roomId: string }) => {
          socket.to(data.roomId).emit("answer", data.answer);
        }
      );
    });
  }
  res.end();
};

export const GET = ioHandler;
