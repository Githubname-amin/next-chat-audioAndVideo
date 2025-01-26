"use client";

interface ChannelListProps {
  activeChannel: string | null;
  onChannelSelect: (channelId: string) => void;
}

export default function ChannelList({
  activeChannel,
  onChannelSelect
}: ChannelListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题 */}
      <div className="h-12 bg-[var(--bg-tertiary)] flex items-center px-4 border-b border-[var(--border-color)]">
        <div className="font-medium">频道信息</div>
      </div>

      {/* 频道列表 */}
      <div className="flex-1 overflow-y-auto">
        {/* 推荐频道组 */}
        <div className="px-2 py-4">
          <div className="text-xs text-[var(--text-tertiary)] px-2 mb-2">
            推荐频道
          </div>
          <div
            className={`
              px-2 py-2 rounded cursor-pointer
              ${
                activeChannel === "music"
                  ? "bg-[var(--bg-hover)]"
                  : "hover:bg-[var(--bg-hover)]"
              }
            `}
            // 可能存在的拓展：对于频道的自定义
            onClick={() => onChannelSelect("music")}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">🎵</span>
              <div>
                <div className="text-sm">音乐交流室</div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  与音乐爱好者实时交流
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部用户信息 */}
      <div className="h-14 bg-[var(--bg-tertiary)] px-4 flex items-center border-t border-[var(--border-color)]">
        <div className="w-8 h-8 rounded-full bg-[var(--bg-hover)] flex items-center justify-center">
          <span>访</span>
        </div>
        <div className="ml-2">
          <div className="text-sm">访客用户</div>
          <div className="text-xs text-[var(--text-tertiary)]">在线</div>
        </div>
      </div>
    </div>
  );
}
