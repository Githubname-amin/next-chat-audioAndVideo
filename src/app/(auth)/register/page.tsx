"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";

export default function RegisterPage() {
  //   const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现注册逻辑
    console.log("Register attempt:", { account, password });
  };

  return (
    <form onSubmit={handleRegister} className="space-y-6">
      <div>
        <div className="flex items-center bg-[var(--bg-primary)] rounded">
          <span className="px-4 py-2 text-[var(--text-secondary)]">账号</span>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="flex-1 bg-transparent text-[var(--text-primary)] px-4 py-2 outline-none"
            placeholder="请输入账号"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center bg-[var(--bg-primary)] rounded">
          <span className="px-4 py-2 text-[var(--text-secondary)]">密码</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent text-[var(--text-primary)] px-4 py-2 outline-none"
            placeholder="请输入密码"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[var(--primary-color)] text-white rounded hover:bg-opacity-90"
      >
        注册
      </button>
    </form>
  );
}
