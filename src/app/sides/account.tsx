import React, { useState } from "react";
import {
  TbBrandMailgun,
  TbBrandTelegram,
  TbLanguage,
  TbSun,
  TbLink,
  TbCheck,
} from "react-icons/tb";

export default function Account() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Русский");
  const languages = [
    "English",
    "Русский",
    "Español",
    "Français",
    "Deutsch",
    "中文",
    "日本語",
  ];

  const closeLanguageModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowLanguageModal(false);
      setIsClosingModal(false);
    }, 300);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    closeLanguageModal();
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-black mb-4">Account</h2>

      <p className="text-xl font-bold text-wup-text mt-6 mb-6">
        Linked socials
      </p>

      <div className="flex flex-col gap-y-2">
        <div className="text-center flex">
          <div className="p-3 rounded-full bg-wup-green-easy h-min w-min">
            <TbBrandMailgun className="text-wup-text" />
          </div>

          <p className="text-wup-text p-2">dynomake@gmail.com</p>
        </div>
        <div className="text-center flex">
          <div className="p-3 rounded-full bg-wup-green-easy h-min w-min">
            <TbBrandTelegram className="text-wup-text" />
          </div>

          <p className="text-wup-text p-2">@dynomake</p>
        </div>
      </div>

      <p className="text-xl font-bold text-wup-text mt-6 mb-6">
        Account settings
      </p>

      <div className="flex flex-wrap gap-y-2 gap-x-2">
        <div
          className="border w-64 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer relative"
          onClick={() => setShowLanguageModal(true)}
        >
          <div className="mb-2">
            <TbLanguage className="text-wup-text h-8 w-8" />
          </div>
          <h3 className="font-medium text-wup-text">Language</h3>
          <p className="text-sm text-wup-green-hover mt-1">
            {selectedLanguage}
          </p>

          {(showLanguageModal || isClosingModal) && (
            <div
              className={`absolute left-72 top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-opacity duration-300 ease-in-out ${
                isClosingModal ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="p-2 max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <div
                    key={language}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageSelect(language);
                    }}
                  >
                    <span className="text-black">{language}</span>
                    {selectedLanguage === language && (
                      <TbCheck className="text-wup-green" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border rounded-lg p-6 pr-28 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="mb-2">
            <TbSun className="text-wup-text h-8 w-8" />
          </div>
          <h3 className="font-medium text-wup-text">Toggle dark mode</h3>
        </div>

        <div className="border rounded-lg p-6 pr-28 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="mb-2">
            <TbLink className="text-wup-text h-8 w-8" />
          </div>
          <h3 className="font-medium text-wup-text">Manage socials</h3>
        </div>
      </div>
    </div>
  );
}
