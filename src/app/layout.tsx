import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebRTC 视频通话",
  description: "实时视频通话应用"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
