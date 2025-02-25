import React, { useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";

export default function Payment() {
    return (
        <div>
            <h2 className="text-4xl font-bold text-black mb-4">Payment</h2>

            <div className="mb-8">
                <p className="text-wup-text mb-2">
                    Here you can buy a tokens for your project
                </p>
                <a href="#" className="text-wup-green font-medium hover:underline">How it works? →</a>
            </div>

            <div className="mb-12 flex flex-col lg:flex-row flex-wrap gap-x-2 gap-y-2">
                <div className="border rounded-lg lg:w-72 bg-wup-green-hover hover:shadow-lg transition-shadow">
                    <div className="p-6 flex flex-col">
                        <span className="text-2xl text-wup-white font-bold">€29.00</span>
                        <span className="lg:mb-10 text-wup-green-easy">1,000,000 tokens / year</span>

                        <a className="bg-white text-center mt-3 lg:mt-10 mb-1 py-2 rounded-xl font-bold text-wup-green-hover hover:bg-wup-green-easy transition-200">Buy</a>
                        <h3 className="text-wup-green-easy">Uses in requests & responses</h3>
                    </div>


                </div>

                <div className="border rounded-lg lg:w-72 hover:shadow-lg transition-shadow">
                    <div className="p-6 flex flex-col">
                        <span className="text-2xl text-wup-text font-bold">€12.99</span>
                        <span className="lg:mb-10 text-wup-text">300,000 tokens / year</span>

                        <a className="bg-wup-green hover:bg-wup-green-hover mt-3 lg:mt-10 transition-200 text-center mb-1 py-2 rounded-xl font-bold text-white">Buy</a>
                        <h3 className="text-wup-text">Uses in requests & responses</h3>
                    </div>
                </div>

                {/*<div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">*/}
                {/*    <div className="mb-2">*/}
                {/*        <span className="text-2xl  font-bold">€1.83</span>*/}
                {/*        <span className="text-wup-text">/mo</span>*/}
                {/*        <span*/}
                {/*            className="ml-2 p-1 px-2 rounded-full bg-wup-green-easy text-wup-green-hover">-50%</span>*/}
                {/*    </div>*/}
                {/*    <h3 className="font-medium text-wup-text">YorkVPN for 6 months</h3>*/}
                {/*</div>*/}
                {/*<div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">*/}
                {/*    <div className="mb-2">*/}
                {/*        <span className="text-2xl text-wup-text font-bold">€2.41</span>*/}
                {/*        <span className="text-wup-text">/mo</span>*/}
                {/*        <span*/}
                {/*            className="ml-2 p-1 px-2 rounded-full bg-wup-green-easy text-wup-green-hover">-50%</span>*/}
                {/*    </div>*/}
                {/*    <h3 className="font-medium text-wup-text">YorkVPN for 3 months</h3>*/}
                {/*</div>*/}
                {/*<div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">*/}
                {/*    <div className="mb-2">*/}
                {/*        <span className="text-2xl text-wup-text font-bold">€2.99</span>*/}
                {/*        <span className="text-wup-text">/mo</span>*/}
                {/*        <span*/}
                {/*            className="ml-2 p-1 px-2 rounded-full bg-wup-green-easy text-wup-green-hover">-50%</span>*/}
                {/*    </div>*/}
                {/*    <h3 className="font-medium text-wup-text">YorkVPN for 3 months</h3>*/}
                {/*</div>*/}
            </div>

        </div>
    );
}