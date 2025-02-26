"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatPage =
    pathname.startsWith("/chats/") && !pathname.endsWith("/chats");

  return (
    <div className="flex">
      {!isChatPage && <Sidebar />}
      <main className={`flex-1 ${isChatPage ? "" : "lg:ml-56"}`}>
        {children}
      </main>
    </div>
  );
}
