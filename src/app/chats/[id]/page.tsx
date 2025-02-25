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

    // Создаем временное сообщение для отображения
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "me",
      file: selectedFile
        ? {
            name: selectedFile.name,
            size: selectedFile.size,
            type: selectedFile.type,
            // Временный URL для предпросмотра файла
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
      const response = await fetch(`/api/chats/${id}/send`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки сообщения");
      }

      const data = await response.json();

      // Обновляем сообщение с данными от сервера
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id
            ? { ...data.message, isUploading: false }
            : msg
        )
      );
    } catch (err) {
      console.error("Ошибка отправки сообщения:", err);
      // Помечаем сообщение как ошибочное
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
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.error
                  ? "bg-red-700 text-white"
                  : msg.sender === "me"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.text && <p className="mb-2">{msg.text}</p>}

              {msg.file && (
                <div className="mt-2 border border-gray-500 rounded p-2 bg-gray-700">
                  <div className="flex items-center gap-2">
                    <FileIcon size={16} />
                    <span className="text-sm truncate flex-1">
                      {msg.file.name}
                    </span>
                    <button
                      onClick={() => downloadFile(msg.file.url, msg.file.name)}
                      className="text-gray-300 hover:text-white"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                  {msg.isUploading && (
                    <p className="text-xs mt-1 text-gray-400">Загрузка...</p>
                  )}
                </div>
              )}

              {msg.error && <p className="text-xs mt-1">Ошибка отправки</p>}
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <div className="mx-4 p-2 bg-gray-800 rounded-lg mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileIcon size={16} className="text-blue-400" />
            <span className="text-sm truncate">{selectedFile.name}</span>
          </div>
          <button
            onClick={removeSelectedFile}
            className="text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите сообщение..."
            className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none"
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
            className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
            disabled={isUploading}
          >
            <PaperclipIcon className="text-white" size={20} />
          </button>
          <button
            onClick={sendMessage}
            className={`p-3 rounded-lg transition ${
              isUploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
            disabled={isUploading}
          >
            <Send className="text-white" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
