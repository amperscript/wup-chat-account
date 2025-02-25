"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isChatPage = pathname.startsWith("/chats/");

    return (
        <div className="flex">
            {!isChatPage && <Sidebar />}
            <main className="flex-1">{children}</main>
        </div>
    );
}
