import React, { useState, useEffect, useRef } from "react";
import {
  VscAccount,
  VscGitStash,
  VscRuby,
  VscCreditCard,
  VscQuestion,
} from "react-icons/vsc";
import { MdSubscriptions } from "react-icons/md";
import {
  TbCompass,
  TbUserCircle,
  TbDownload,
  TbWallet,
  TbCarambola,
  TbBook,
  TbMessageChatbot,
  TbChevronDown,
  TbCheck,
  TbPlus,
} from "react-icons/tb";

// @ts-ignore
const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "home", label: "Home", icon: <TbCompass className="w-5 h-5" /> },
    {
      id: "account",
      label: "Account",
      icon: <TbUserCircle className="w-5 h-5" />,
    },
    {
      id: "chats",
      label: "Chats",
      icon: <TbMessageChatbot className="w-5 h-5" />,
    },
    {
      id: "subscriptions",
      label: "Payment",
      icon: <TbWallet className="w-5 h-5" />,
    },
    { id: "help", label: "Support", icon: <TbBook className="w-5 h-5" /> },
  ];

  const [selectedProject, setSelectedProject] = useState("TestShop");
  const projects = [
    { id: 1, name: "TestShop", description: "Основной тестовый проект" },
    { id: 2, name: "Project A", description: "Проект для разработки" },
    { id: 3, name: "Project B", description: "Маркетинговый проект" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const modalRef = useRef(null);

  const filteredProjects = searchTerm
    ? projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Match transition duration
  };

  const handleCreateProject = () => {
    if (newProjectName.trim() === "") return;

    console.log("Создание нового проекта:", newProjectName);

    setNewProjectName("");
    setShowCreateForm(false);
  };

  return (
    <div
      className={`lg:bg-wup-white transition-all duration-300
                    lg:h-screen fixed lg:left-0 lg:top-0 lg:w-56 lg:rounded-none lg:mx-0
                    lg:border-none
                    border bg-wup-white h-16 w-full bottom-0 top-auto`}
    >
      <div className="p-4 flex justify-between items-center hidden lg:block">
        <img src="/wupchat.png" alt="WupTech Logo" className="mt-4 ml-4 h-6" />
      </div>
      <nav
        className="mt-0 flex-row hidden lg:flex justify-center h-full lg:h-min
                            lg:mt-12 lg:gap-y-1 lg:items-center lg:flex-col relative"
      >
        <span className="lg:w-48 mt-1 text-sm px-3 text-wup-text lg:mt-0 text-left">
          Проект
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between bg-wup-green lg:h-min text-xs lg:text-base font-medium p-3 lg:w-44 rounded-2xl hover:bg-wup-green-hover transition-colors duration-400`}
        >
          <span className="text-white">{selectedProject}</span>
          <TbChevronDown
            className={`text-white transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {(isOpen || isClosing) && (
          <div
            ref={modalRef}
            className={`absolute left-64 top-24 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-opacity duration-300 ease-in-out ${
              isClosing ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="p-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Поиск проектов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-wup-green"
              />
            </div>

            <div className="max-h-60 overflow-y-auto">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => {
                    setSelectedProject(project.name);
                    closeModal();
                  }}
                >
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-gray-500">
                      {project.description}
                    </div>
                  </div>
                  {selectedProject === project.name && (
                    <TbCheck className="text-wup-green" />
                  )}
                </div>
              ))}

              {filteredProjects.length === 0 && (
                <div className="px-4 py-3 text-center text-gray-500">
                  Нет результатов
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-3">
              {showCreateForm ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Название проекта"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-wup-green"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCreateProject}
                      className="flex-1 bg-wup-green hover:bg-wup-green-hover text-white py-2 px-3 rounded-lg text-sm"
                    >
                      Создать
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewProjectName("");
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-wup-text py-2 px-4 rounded-lg text-sm"
                >
                  <TbPlus />
                  <span>Новый проект</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <nav
        className="mt-0 flex-row justify-center h-full lg:h-min
                            lg:mt-12 lg:gap-y-1 lg:items-center flex lg:flex-col"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col lg:flex-row items-center lg:h-min text-xs lg:text-base font-medium lg:space-x-3 p-3 lg:w-44 rounded-2xl hover:bg-wup-gray transition-colors duration-400 ${
              activeTab === tab.id
                ? "bg-wup-green-easy text-wup-green-hover hover:bg-wup-green-easy"
                : "text-wup-text"
            }`}
          >
            {tab.icon}
            <span className="lg:w-min mt-1 lg:mt-0 w-full text-center">
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 p-4 flex text-wup-text justify-between items-center">
        <p className={`p-3 hidden lg:block`}>WupTech 2025</p>
      </div>
    </div>
  );
};

export default Sidebar;
