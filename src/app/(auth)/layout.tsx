"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="w-[400px] p-8 bg-[var(--bg-secondary)] rounded-lg shadow-lg">
        <div className="flex border-b border-[var(--border-color)] mb-6">
          <Link
            href="/login"
            className={`pb-2 px-4 ${
              pathname === '/login'
                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            登入
          </Link>
          <Link
            href="/register"
            className={`pb-2 px-4 ${
              pathname === '/register'
                ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                : 'text-[var(--text-secondary)]'
            }`}
          >
            注册
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
} 