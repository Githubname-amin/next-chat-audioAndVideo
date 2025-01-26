"use client";

import UserPanel from "../UserPanel";
import ChannelGroup from "./ChannelGroup";
import type { Channel } from "../../types/channel";

interface ChannelListProps {
  activeChannel: string | null;
  onChannelSelect: (channelId: string) => void;
}

export default function ChannelList({
  activeChannel,
  onChannelSelect
}: ChannelListProps) {
  // 模拟频道数据，后续可以从API获取
  const recommendedChannels: Channel[] = [
    {
      id: "music",
      name: "音乐交流室",
      description: "与音乐爱好者实时交流",
      icon: "🎵",
      type: "recommended"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[var(--bg-secondary)]">
      {/* 顶部标题 */}
      <div className="h-12 flex items-center px-4 border-b border-[var(--border-color)]">
        <div className="font-medium text-[var(--text-primary)]">频道信息</div>
      </div>

      {/* 频道列表 */}
      <div className="flex-1 overflow-y-auto">
        <ChannelGroup
          title="推荐频道"
          channels={recommendedChannels}
          activeChannel={activeChannel}
          onChannelSelect={onChannelSelect}
        />
      </div>

      {/* 底部用户面板 */}
      <UserPanel />
    </div>
  );
}
