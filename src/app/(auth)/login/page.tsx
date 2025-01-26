"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("test@example.com"); // 测试账号
  const [password, setPassword] = useState("123456"); // 测试密码
  const [isAutoLogin, setIsAutoLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const authService = AuthService.getInstance();
      await authService.login({ email, password });

      // 登录成功，跳转到主页
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div>
        <div className="flex items-center bg-[var(--bg-primary)] rounded">
          <span className="px-4 py-2 text-[var(--text-secondary)]">账号</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-[var(--text-primary)] px-4 py-2 outline-none"
            placeholder="请输入邮箱"
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isAutoLogin}
          onChange={(e) => setIsAutoLogin(e.target.checked)}
          className="mr-2"
          disabled={isLoading}
        />
        <span className="text-sm text-[var(--text-secondary)]">
          下次自动登录
        </span>
      </div>

      <button
        type="submit"
        className={`w-full py-2 bg-[var(--primary-color)] text-white rounded hover:bg-opacity-90 transition-colors ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : "登录"}
      </button>
    </form>
  );
}
