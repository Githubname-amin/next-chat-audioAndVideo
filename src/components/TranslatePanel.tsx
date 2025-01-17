"use client";
import { useState } from "react";

export default function TranslatePanel() {
  const [isTranslating, setIsTranslating] = useState(false);

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">实时翻译</h3>
        <button
          onClick={() => setIsTranslating(!isTranslating)}
          className={`px-4 py-2 rounded ${
            isTranslating ? "bg-blue-500" : "bg-gray-500"
          } text-white`}
        >
          {isTranslating ? "关闭翻译" : "开启翻译"}
        </button>
      </div>
      <div className="h-32 bg-gray-100 rounded p-2">
        翻译内容将在这里显示...
      </div>
    </div>
  );
}
