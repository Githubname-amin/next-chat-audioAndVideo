"use client";

interface User {
  id: string;
  name: string;
  status: "在线" | "离开";
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isSpeaking: boolean;
}

interface UserListProps {
  users: User[];
  currentUserId: string;
}

export default function UserList({ users = [], currentUserId }: UserListProps) {
  if (!Array.isArray(users)) {
    console.warn("UserList: users prop is not an array", users);
    return null;
  }
  console.log("usersList页面", users);
  return (
    <div className="h-full flex flex-col">
      <div className="h-12 bg-[var(--bg-tertiary)] flex items-center px-4 border-b border-[var(--border-color)]">
        <div className="text-[var(--text-primary)]">其他用户信息</div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className={`
              flex items-center px-3 py-2 rounded-md
              ${
                user.isSpeaking
                  ? "bg-[var(--bg-hover)] ring-1 ring-blue-500"
                  : "hover:bg-[var(--bg-hover)]"
              }
            `}
          >
            {/* 用户头像 */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                {user.name[0]}
              </div>
              {/* 在线状态指示器 */}
              <div
                className={`
                absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--bg-secondary)]
                ${user.status === "在线" ? "bg-green-500" : "bg-gray-500"}
              `}
              />
            </div>

            {/* 用户信息 */}
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <span className="text-sm font-medium">
                  {user.id === currentUserId ? `${user.name} (我)` : user.name}
                </span>
              </div>
              <div className="text-xs text-[var(--text-tertiary)]">
                {user.status}
              </div>
            </div>

            {/* 媒体状态图标 */}
            <div className="flex items-center gap-2">
              {user.isVideoEnabled && (
                <div className="text-xs px-2 py-1 rounded bg-[var(--bg-primary)]">
                  📹
                </div>
              )}
              {user.isAudioEnabled && (
                <div
                  className={`text-xs px-2 py-1 rounded bg-[var(--bg-primary)] ${
                    user.isSpeaking ? "text-green-500" : ""
                  }`}
                >
                  🎤
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
