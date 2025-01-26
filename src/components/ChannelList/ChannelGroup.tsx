import type { Channel } from "@/types/channel";

interface ChannelGroupProps {
  title: string;
  channels: Channel[];
  activeChannel: string | null;
  onChannelSelect: (channelId: string) => void;
}

export default function ChannelGroup({
  title,
  channels,
  activeChannel,
  onChannelSelect
}: ChannelGroupProps) {
  return (
    <div className="px-2 py-4">
      <div className="text-xs text-[var(--text-tertiary)] px-2 mb-2">
        {title}
      </div>
      {channels.map((channel) => (
        <div
          key={channel.id}
          className={`
            px-2 py-2 rounded cursor-pointer transition-colors
            ${
              activeChannel === channel.id
                ? "bg-[var(--bg-hover)]"
                : "hover:bg-[var(--bg-hover)]"
            }
          `}
          onClick={() => onChannelSelect(channel.id)}
        >
          <div className="flex items-center">
            <span className="text-lg mr-2">{channel.icon}</span>
            <div>
              <div className="text-sm text-[var(--text-primary)]">
                {channel.name}
              </div>
              <div className="text-xs text-[var(--text-tertiary)]">
                {channel.description}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
