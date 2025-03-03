"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Send,
  Settings,
  PaperclipIcon,
  FileIcon,
  X,
  Download,
} from "lucide-react";
import Image from "next/image";
import ChatSidebar from "@/components/ChatSidebar";
import ChatLoadingAnimation from "@/components/ChatLoadingAnimation";

export default function ChatPage() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function fetchChat() {
      try {
        setLoading(true);
        const response = await fetch(`/api/chats/${id}`);
        if (!response.ok) throw new Error("Чат не найден");
        const data = await response.json();
        setChat(data);
        setMessages(data.messages || []);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchChat();
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const sendMessage = async () => {
    if (!input.trim() && !selectedFile) return;

    setIsUploading(Boolean(selectedFile));

    const formData = new FormData();
    if (input.trim()) {
      formData.append("text", input);
    }

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
            url: selectedFile ? URL.createObjectURL(selectedFile) : null,
          }
        : null,
      isUploading: Boolean(selectedFile),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const response = await fetch(`/api/chats/${id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки сообщения");
      }

      const data = await response.json();

      // Симуляция ответа от сервера (в реальном приложении это будет приходить через WebSocket)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: selectedFile
              ? `Спасибо за файл ${newMessage.file?.name || ""}!`
              : "Получил твое сообщение!",
            sender: "other",
          },
        ]);
      }, 1000);

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id
            ? { ...data.message, isUploading: false }
            : msg
        )
      );
    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, error: true, isUploading: false }
            : msg
        )
      );
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <ChatLoadingAnimation />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!chat) return null;

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Боковая панель со списком чатов */}
      <ChatSidebar currentChatId={id} />

      {/* Основной чат */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image
              src={chat.avatar}
              width={40}
              height={40}
              alt="User Avatar"
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">{chat.name}</p>
              <p className="text-xs text-wup-text">В сети</p>
            </div>
          </div>
          <Settings className="cursor-pointer text-wup-text hover:text-wup-green transition" />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.error
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : msg.sender === "me"
                    ? "bg-wup-green-easy text-wup-green-hover"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                {msg.text && <p className="mb-2">{msg.text}</p>}

                {msg.file && (
                  <div className="mt-2 border border-gray-200 rounded p-2 bg-white">
                    <div className="flex items-center gap-2">
                      <FileIcon size={16} className="text-wup-green-hover" />
                      <span className="text-sm truncate flex-1 text-black">
                        {msg.file.name}
                      </span>
                      <button
                        onClick={() =>
                          downloadFile(msg.file.url, msg.file.name)
                        }
                        className="text-wup-text hover:text-wup-green-hover"
                      >
                        <Download size={16} />
                      </button>
                    </div>
                    {msg.isUploading && (
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-wup-green h-1.5 rounded-full w-1/2 animate-pulse"></div>
                        </div>
                        <p className="text-xs ml-2 text-wup-text">
                          Загрузка...
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {msg.error && <p className="text-xs mt-1">Ошибка отправки</p>}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {selectedFile && (
          <div className="mx-4 p-2 bg-gray-100 rounded-lg mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon size={16} className="text-wup-green" />
              <span className="text-sm truncate text-black">
                {selectedFile.name}
              </span>
            </div>
            <button
              onClick={removeSelectedFile}
              className="text-wup-text hover:text-wup-green"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-gray-100 text-black p-3 rounded-lg outline-none border border-gray-200 focus:border-wup-green-hover"
              onKeyDown={(e) =>
                e.key === "Enter" && !isUploading && sendMessage()
              }
              disabled={isUploading}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={triggerFileInput}
              className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition border border-gray-200"
              disabled={isUploading}
            >
              <PaperclipIcon className="text-wup-text" size={20} />
            </button>
            <button
              onClick={sendMessage}
              className={`p-3 rounded-lg transition ${
                isUploading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-wup-green hover:bg-wup-green-hover"
              }`}
              disabled={isUploading}
            >
              <Send className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
