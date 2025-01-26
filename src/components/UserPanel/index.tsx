"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import UserPopover from "../UserPopover";
import AuthService from "@/services/authService";
import type { User } from "@/types/user";

export default function UserPanel() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const authService = AuthService.getInstance();

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setCurrentUser({
        ...user,
        status: "online",
        avatar: user.avatar || "/images/default-avatar.png"
      });
    }
  }, []);

  if (!currentUser) return null;

  return (
    <div className="p-4 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <UserPopover user={currentUser} isCurrentUser>
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-[var(--bg-primary)] p-2 rounded transition-colors">
          <div className="relative">
            <Image
              src={currentUser.avatar || "/images/default-avatar.png"}
              alt={currentUser.username}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border-2 border-[var(--bg-secondary)]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[var(--text-primary)] truncate">
              {currentUser.username}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">在线</p>
          </div>
        </div>
      </UserPopover>
    </div>
  );
}
