import React, { useState } from 'react';
import { VscAccount, VscGitStash, VscRuby, VscCreditCard, VscQuestion } from 'react-icons/vsc';
import { MdSubscriptions } from 'react-icons/md';
import {TbCompass, TbUserCircle, TbDownload, TbWallet, TbCarambola, TbBook, TbMessageChatbot} from "react-icons/tb";

// @ts-ignore
const Sidebar = ({ activeTab, setActiveTab }) => {

    const tabs = [
        { id: 'home', label: 'Home', icon: <TbCompass className="w-5 h-5" /> },

        { id: 'account', label: 'Account', icon: <TbUserCircle className="w-5 h-5" /> },
        { id: 'chats', label: 'Chats', icon: <TbMessageChatbot className="w-5 h-5" /> },

        { id: 'subscriptions', label: 'Payment', icon: <TbWallet className="w-5 h-5" /> },
        { id: 'help', label: 'Support', icon: <TbBook className="w-5 h-5" /> },
    ];

    const [selectedProject, setSelectedProject] = useState('TestShop');

    const projects = ['TestShop', 'Project', 'Project']; // Список проектов
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div
            className={`lg:bg-wup-white  transition-all duration-300
                    lg:h-screen fixed lg:left-0 lg:top-0 lg:w-56 lg:rounded-none lg:mx-0
                    lg:border-none
                    border bg-wup-white h-16 w-full bottom-0 top-auto
`}
        >
            <div className="p-4 flex justify-between items-center hidden lg:block">
                <img src="/wupchat.png" alt="WupTech Logo" className="mt-4 ml-4 h-6"/>
            </div>
            <nav className="mt-0 flex-row hidden lg:flex justify-center h-full lg:h-min
                            lg:mt-12 lg:gap-y-1 lg:items-center lg:flex-col">

               <span className="lg:w-48 mt-1 text-sm px-3 text-wup-text lg:mt-0 text-left">
        Проект
      </span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex flex-col lg:flex-row items-center bg-wup-green lg:h-min text-xs lg:text-base font-medium lg:space-x-3 p-3 lg:w-44 rounded-2xl hover:bg-wup-green-hover transition-colors duration-400`}
                >
        <span className="lg:w-min mt-1 text-white lg:mt-0 w-full text-center">
          {selectedProject}
        </span>
                </button>

                {isOpen && (
                    <div className="absolute mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setSelectedProject(project);
                                    setIsOpen(false);
                                }}
                            >
                                {project}
                            </div>
                        ))}
                    </div>
                )}

            </nav>

            <nav className="mt-0 flex-row justify-center h-full lg:h-min
                            lg:mt-12 lg:gap-y-1 lg:items-center flex lg:flex-col">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col lg:flex-row items-center lg:h-min text-xs lg:text-base font-medium lg:space-x-3 p-3 lg:w-44 rounded-2xl hover:bg-wup-gray transition-colors duration-400 ${
                                activeTab === tab.id
                                    ? 'bg-wup-green-easy text-wup-green-hover hover:bg-wup-green-easy' // Зеленый фон и белый текст
                                    : 'text-wup-text'
                            }`}
                        >
                            {tab.icon}
                            <span className="lg:w-min mt-1 lg:mt-0 w-full text-center">{tab.label}</span>
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