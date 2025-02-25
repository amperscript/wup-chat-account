import React, {useState} from "react";
import Sidebar from "@/app/sidebar";
import { TbBrandMailgun, TbBrandTelegram, TbLanguage, TbSun, TbLink } from "react-icons/tb";

export default function Account() {
    return (
        <div>
            <h2 className="text-4xl font-bold text-black mb-4">Account</h2>

            <p className="text-xl font-bold text-wup-text mt-6 mb-6">Linked socials</p>


            <div className="flex flex-col gap-y-2">
                <div className="text-center flex">
                    <div className="p-3 rounded-full bg-wup-green-easy h-min w-min">
                        <TbBrandMailgun className="text-wup-text "/>
                    </div>

                    <p className="text-wup-text p-2">dynomake@gmail.com</p>
                </div>
                <div className="text-center flex">
                    <div className="p-3 rounded-full bg-wup-green-easy h-min w-min">
                        <TbBrandTelegram className="text-wup-text "/>
                    </div>

                    <p className="text-wup-text p-2">@dynomake</p>
                </div>
            </div>

            <p className="text-xl font-bold text-wup-text mt-6 mb-6">Account settings</p>

            <div className="flex flex-wrap gap-y-2 gap-x-2">
                <div className="border w-64 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="mb-2">
                        <TbLanguage className="text-wup-text h-8 w-8"/>
                    </div>
                    <h3 className="font-medium text-wup-text">Language</h3>
                </div>
                <div className="border rounded-lg p-6 pr-28 hover:shadow-lg transition-shadow">
                    <div className="mb-2">
                        <TbSun className="text-wup-text h-8 w-8"/>
                    </div>
                    <h3 className="font-medium text-wup-text">Toggle dark mode</h3>
                </div>
                <div className="border rounded-lg p-6 pr-28 hover:shadow-lg transition-shadow">
                    <div className="mb-2">
                        <TbLink className="text-wup-text h-8 w-8"/>
                    </div>
                    <h3 className="font-medium text-wup-text">Manage socials</h3>
                </div>
            </div>

        </div>
    );
}