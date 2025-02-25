'use client'

import Image from "next/image";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Payment from "@/app/sides/payment";
import Account from "@/app/sides/account";
import ChatList from "@/app/sides/chats/page";

export default function Home() {
    const [activeTab, setActiveTab] = useState("home");

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return <Account />;
            case "subscriptions":
                return <Payment />;
            case "chats":
                return <ChatList />;
            case "help":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-wup-green mb-4">Help</h2>
                        <p className="text-wup-text">
                            Свяжитесь с нами: support@yorkvpn.com
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-wup-white font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="lg:ml-64 p-8">
                <div className="bg-white rounded-lg p-4">{renderContent()}</div>
            </main>
        </div>
    );
}
