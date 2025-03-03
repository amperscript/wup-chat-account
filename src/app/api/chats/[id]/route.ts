import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

const chats = [
  {
    id: "1",
    name: "Анна Иванова",
    avatar: "/public/avatar3.jpg",
    messages: [
      { id: 1, text: "Привет! Как дела?", sender: "other" },
      { id: 2, text: "Привет! Всё отлично, а у тебя?", sender: "me" },
    ],
  },
  {
    id: "2",
    name: "Сергей Петров",
    avatar: "/public/avatar3.jpg",
    messages: [
      { id: 1, text: "МОШЕННИКИ! верните деньги!", sender: "other" },
      { id: 2, text: "хааххахаха лох", sender: "me" },
    ],
  },
];

export async function GET(req, { params }) {
  const chat = chats.find((c) => c.id === params.id);
  if (!chat)
    return NextResponse.json({ error: "Чат не найден" }, { status: 404 });

  return NextResponse.json(chat);
}

export async function POST(req, { params }) {
  const chat = chats.find((c) => c.id === params.id);
  if (!chat)
    return NextResponse.json({ error: "Чат не найден" }, { status: 404 });

  const formData = await req.formData();
  const text = formData.get("text");
  const file = formData.get("file");

  const messageId = Date.now();
  const newMessage = {
    id: messageId,
    text: text || "",
    sender: "me",
    file: null,
  };
  if (file) {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${uuidv4()}-${file.name}`;
      const filePath = join(process.cwd(), "public", "uploads", fileName);

      await writeFile(filePath, buffer);

      newMessage.file = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${fileName}`,
      };
    } catch (error) {
      console.error("Ошибка при сохранении файла:", error);
      return NextResponse.json(
        { error: "Ошибка при сохранении файла" },
        { status: 500 }
      );
    }
  }

  chat.messages.push(newMessage);

  setTimeout(() => {
    const responseMessage = {
      id: Date.now(),
      text: file
        ? `Спасибо за файл ${newMessage.file.name}!`
        : "Получил твое сообщение!",
      sender: "other",
    };
    chat.messages.push(responseMessage);
  }, 2000);

  return NextResponse.json({
    success: true,
    message: newMessage,
  });
}
