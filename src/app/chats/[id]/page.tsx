"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Send, Settings } from "lucide-react";
import Image from "next/image";

export default function ChatPage() {
    const { id } = useParams();
    const [chat, setChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        async function fetchChat() {
            try {
                const response = await fetch(`/api/chats/${id}`);
                if (!response.ok) throw new Error("Чат не найден");
                const data = await response.json();
                setChat(data);
                setMessages(data.messages || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchChat();
    }, [id]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: input,
            sender: "me",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput("");

        fetch(`/api/chats/${id}/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMessage),
        }).catch((err) => console.error("Ошибка отправки сообщения:", err));
    };

    if (loading) return <p className="text-center text-gray-400">Загрузка...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!chat) return null;

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <Image
                        src={chat.avatar}
                        width={40}
                        height={40}
                        alt="User Avatar"
                        className="rounded-full"
                    />
                    <p className="text-lg font-semibold">{chat.name}</p>
                </div>
                <Settings className="cursor-pointer text-gray-400 hover:text-white transition" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-xs p-3 rounded-lg ${
                                msg.sender === "me"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-800 text-gray-200"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition"
                >
                    <Send className="text-white" size={20} />
                </button>
            </div>
        </div>
    );
}
