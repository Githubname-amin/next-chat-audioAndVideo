"use client";
import { useState } from "react";

export default function RecordButton() {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: 实现录制逻辑
  };

  return (
    <button
      onClick={toggleRecording}
      className={`px-4 py-2 rounded ${
        isRecording ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {isRecording ? "停止录制" : "开始录制"}
    </button>
  );
}
