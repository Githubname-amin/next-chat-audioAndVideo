import UserPanel from "../UserPanel";

export default function Sidebar() {
  return (
    <div className="w-60 h-full flex flex-col bg-[var(--bg-secondary)]">
      {/* 其他侧边栏内容 */}

      {/* 底部用户面板 */}
      <div className="mt-auto">
        <UserPanel />
      </div>
    </div>
  );
}
