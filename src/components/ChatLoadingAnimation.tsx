import React from "react";

const ChatLoadingAnimation = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 w-full h-full rounded-full border-4 border-t-wup-green border-r-wup-green-easy border-b-gray-200 border-l-gray-200 animate-spin"></div>
        </div>
        <p className="mt-4 text-wup-text font-medium">Загрузка сообщений...</p>
        <div className="mt-6 space-y-2 w-64">
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-2 bg-gray-200 rounded animate-pulse w-5/6 ml-auto"></div>
          <div className="h-2 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoadingAnimation;
