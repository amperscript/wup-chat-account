import { NextResponse } from "next/server";

const chats = [
    {
        id: "1",
        name: "Анна Иванова",
        avatar: "/avatars/anna.jpg",
        messages: [
            { id: 1, text: "Привет! Как дела?", sender: "other" },
            { id: 2, text: "Привет! Всё отлично, а у тебя?", sender: "me" },
        ],
    },
    {
        id: "2",
        name: "Сергей Петров",
        avatar: "/avatars/sergey.jpg",
        messages: [
            { id: 1, text: "Привет!", sender: "me" },
            { id: 2, text: "Давай завтра встретимся", sender: "other" },
        ],
    },
];

export async function GET(req, { params }) {
    const chat = chats.find((c) => c.id === params.id);
    if (!chat) return NextResponse.json({ error: "Чат не найден" }, { status: 404 });

    return NextResponse.json(chat);
}
