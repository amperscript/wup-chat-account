import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus } from "lucide-react";

const ChatSidebar = ({ currentChatId }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredChats = searchTerm
    ? chats.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (chat.lastMessage &&
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : chats;

  return (
    <div className="w-64 h-screen border-r border-gray-200 bg-white overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Чаты</h2>
          <button className="p-2 rounded-full hover:bg-gray-100 text-wup-text transition"></button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск чатов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-8 bg-gray-100 text-black rounded-lg outline-none focus:ring-1 focus:ring-wup-green"
          />
          <Search className="absolute left-2 top-2.5 text-wup-text" size={16} />
        </div>
      </div>

      <div className="p-2 space-y-1">
        {loading ? (
          <div className="flex flex-col items-center py-4">
            <div className="w-8 h-8 border-2 border-t-wup-green border-r-wup-green-easy border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-wup-text">Загрузка чатов...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-sm p-4">{error}</p>
        ) : filteredChats.length === 0 ? (
          <p className="text-center text-wup-text text-sm p-4">
            Чаты не найдены
          </p>
        ) : (
          filteredChats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chats/${chat.id}`}
              className={`block w-full p-3 rounded-lg transition-colors ${
                currentChatId === chat.id
                  ? "bg-wup-green-easy text-wup-green-hover"
                  : "hover:bg-gray-100 text-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    width={40}
                    height={40}
                    alt={`${chat.name} avatar`}
                    className="rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-width-0">
                  <p className="font-medium truncate">{chat.name}</p>
                  <p
                    className={`text-xs truncate ${
                      currentChatId === chat.id
                        ? "text-wup-green-hover opacity-80"
                        : "text-wup-text"
                    }`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
