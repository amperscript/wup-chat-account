"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetch("/api/chats");
        if (!response.ok) throw new Error("Ошибка загрузки чатов");
        const data = await response.json();
        setChats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchChats();
  }, []);

  if (loading)
    return <p className="text-center text-gray-400">Загрузка чатов...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-4xl font-bold text-black mb-6">📩 Чаты</h2>
      <div className="space-y-2">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chats/${chat.id}`} className="block">
            <div className="p-4 bg-white border rounded-xl hover:shadow-lg transition flex items-center gap-4 cursor-pointer">
              <Image
                src={chat.avatar}
                width={40}
                height={40}
                alt="User Avatar"
                className="rounded-full"
              />
              <div>
                <p className="text-black font-semibold">{chat.name}</p>
                <p className="text-wup-text text-sm">{chat.lastMessage}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
