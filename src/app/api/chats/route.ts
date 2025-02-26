import { NextResponse } from "next/server";

export async function GET() {
  const chats = [
    {
      id: "1",
      name: "Анна Иванова",
      avatar: "/public/avatar1.jpg",
      lastMessage: "Привет!",
    },
    {
      id: "2",
      name: "Сергей Петров",
      avatar: "/public/avatar2.jpg",
      lastMessage: "Договорились!",
    },
    {
      id: "3",
      name: "Мария Смирнова",
      avatar: "/public/avatar3.jpg",
      lastMessage: "Отправил документы.",
    },
  ];

  return NextResponse.json(chats);
}
