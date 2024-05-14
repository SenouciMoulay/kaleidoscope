import React, { useState } from 'react';
import {ColorFilter} from "@/components/colorFilter/colorFilter";
import {Dock, DockIcon} from "@/components/ui/dock";

const SearchModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center z-50">
            <div className="flex items-center justify-center w-full h-2/4 p-5 rounded-lg relative">
                <input
                    type="text"
                    className="w-4/12 bg-transparent border-0 border-b-2 border-yellow-500 text-yellow-500 font-bold text-3xl"
                    style={{outline: 'none', borderBottomWidth: '1px'}}
                />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold"
                >
                    Fermer
                </button>
            </div>
            <div>
                <Dock className={"my-4"}>
                    <DockIcon size={40} className={"bg-white"} />
                    <DockIcon size={40} className={"bg-black border border-white"} />
                    <DockIcon size={40} className={"bg-blue-500"} />
                    <DockIcon size={40} className={"bg-red-700"} />
                    <DockIcon size={40} className={"bg-red-800"} />
                    <DockIcon size={40} className={"bg-pink-600"} />
                    <DockIcon size={40} className={"bg-yellow-300"} />
                    <DockIcon size={40} className={"bg-green-400"} />
                    <DockIcon size={40} className={"bg-indigo-700"} />
                    <DockIcon size={40} className={"bg-orange-400"} />
                </Dock>
            </div>
        </div>
    );
};

export default SearchModal;
