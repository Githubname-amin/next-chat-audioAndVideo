"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@/types/user";

interface UserPopoverProps {
  user: User;
  isCurrentUser?: boolean;
  children: React.ReactNode;
}

export default function UserPopover({
  user,
  isCurrentUser = false,
  children
}: UserPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}

        {isOpen && (
          <div
            className="absolute left-full bottom-0 w-[280px] bg-[var(--bg-secondary)] rounded-lg shadow-lg p-4"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* 用户信息 */}
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--bg-secondary)] ${
                    user.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-[var(--text-primary)]">
                  {user.username}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {user.status === "online" ? "在线" : "离线"}
                </p>
                {user.bio && (
                  <p className="text-sm text-[var(--text-secondary)] mt-2">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* 操作按钮 */}
            {!isCurrentUser && (
              <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-x-2">
                <button className="px-3 py-1 text-sm rounded bg-[var(--primary-color)] text-white hover:bg-opacity-90">
                  发送消息
                </button>
                <button className="px-3 py-1 text-sm rounded bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-opacity-90">
                  添加好友
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
