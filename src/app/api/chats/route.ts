import { NextResponse } from "next/server";

export async function GET() {
    const chats = [
        { id: "1", name: "Анна Иванова", avatar: "/avatars/anna.jpg", lastMessage: "Привет!" },
        { id: "2", name: "Сергей Петров", avatar: "/avatars/sergey.jpg", lastMessage: "Договорились!" },
        { id: "3", name: "Мария Смирнова", avatar: "/avatars/maria.jpg", lastMessage: "Отправил документы." },
    ];

    return NextResponse.json(chats);
}
