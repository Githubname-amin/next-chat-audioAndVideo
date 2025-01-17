"use client";
import { useState } from "react";

interface ChatBoxProps {
  roomId: string;
}

export default function ChatBox({ roomId }: ChatBoxProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      sender: string;
    }>
  >([]);
  console.log("roomId", roomId);
  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: message,
        sender: "我"
      }
    ]);
    setMessage("");
  };

  return (
    <div className="border rounded-lg p-4 h-[400px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${
              msg.sender === "我" ? "bg-blue-100 ml-auto" : "bg-gray-100"
            }`}
          >
            <span className="font-bold">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="输入消息..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          发送
        </button>
      </div>
    </div>
  );
}
