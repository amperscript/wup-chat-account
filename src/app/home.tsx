import React, { useState } from "react";
import {
  TbCoins,
  TbChartBar,
  TbMessages,
  TbMessageCheck,
  TbShoppingCart,
} from "react-icons/tb";
import Link from "next/link";

export default function Home() {
  const [timeRange, setTimeRange] = useState("day");

  const tokenBalance = 750000;

  const statsData = {
    day: {
      tokensUsed: 1250,
      totalRequests: 48,
      completedRequests: 42,
    },
    week: {
      tokensUsed: 8750,
      totalRequests: 326,
      completedRequests: 305,
    },
    month: {
      tokensUsed: 36400,
      totalRequests: 1384,
      completedRequests: 1290,
    },
    year: {
      tokensUsed: 250000,
      totalRequests: 8540,
      completedRequests: 8120,
    },
  };

  const currentStats = statsData[timeRange];

  const completionRate = Math.round(
    (currentStats.completedRequests / currentStats.totalRequests) * 100
  );

  return (
    <div>
      <h2 className="text-4xl font-bold text-black mb-6">Главная</h2>
      <div className="border rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow bg-wup-green-easy">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 rounded-full bg-wup-green text-white">
            <TbCoins className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-wup-text">
              Баланс токенов
            </h3>
            <p className="text-2xl font-bold text-wup-green-hover">
              {tokenBalance.toLocaleString()}
            </p>
          </div>
          <Link href="/sides/payment" className="ml-auto">
            <button className="bg-wup-green hover:bg-wup-green-hover text-white py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
              <TbShoppingCart className="h-5 w-5" />
              <span>Купить токены</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl font-bold text-wup-text mb-3">Статистика</p>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTimeRange("day")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "day"
                ? "bg-wup-green-easy text-wup-green-hover"
                : "text-wup-text hover:bg-wup-gray"
            }`}
          >
            День
          </button>
          <button
            onClick={() => setTimeRange("week")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "week"
                ? "bg-wup-green-easy text-wup-green-hover"
                : "text-wup-text hover:bg-wup-gray"
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "month"
                ? "bg-wup-green-easy text-wup-green-hover"
                : "text-wup-text hover:bg-wup-gray"
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "year"
                ? "bg-wup-green-easy text-wup-green-hover"
                : "text-wup-text hover:bg-wup-gray"
            }`}
          >
            Год
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow flex-1 min-w-[240px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-wup-green-easy">
              <TbChartBar className="text-wup-green-hover h-5 w-5" />
            </div>
            <h3 className="font-medium text-wup-text">Расход токенов</h3>
          </div>
          <p className="text-3xl font-bold text-black">
            {currentStats.tokensUsed.toLocaleString()}
          </p>
          <p className="text-sm text-wup-text mt-1">
            За {timeRangeText(timeRange)}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow flex-1 min-w-[240px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-wup-green-easy">
              <TbMessages className="text-wup-green-hover h-5 w-5" />
            </div>
            <h3 className="font-medium text-wup-text">Количество обращений</h3>
          </div>
          <p className="text-3xl font-bold text-black">
            {currentStats.totalRequests.toLocaleString()}
          </p>
          <p className="text-sm text-wup-text mt-1">
            За {timeRangeText(timeRange)}
          </p>
        </div>

        <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow flex-1 min-w-[240px]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-wup-green-easy">
              <TbMessageCheck className="text-wup-green-hover h-5 w-5" />
            </div>
            <h3 className="font-medium text-wup-text">
              Успешно закрытые обращения
            </h3>
          </div>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-black">
              {currentStats.completedRequests.toLocaleString()}
            </p>
            <p className="text-lg font-medium text-wup-green mb-1">
              ({completionRate}%)
            </p>
          </div>
          <p className="text-sm text-wup-text mt-1">
            За {timeRangeText(timeRange)}
          </p>
        </div>
      </div>
    </div>
  );
}

function timeRangeText(range) {
  switch (range) {
    case "day":
      return "день";
    case "week":
      return "неделю";
    case "month":
      return "месяц";
    case "year":
      return "год";
    default:
      return range;
  }
}
