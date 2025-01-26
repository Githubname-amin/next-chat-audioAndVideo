export interface Channel {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "recommended" | "custom";
  // 可以添加更多属性
  memberCount?: number;
  isPrivate?: boolean;
}
