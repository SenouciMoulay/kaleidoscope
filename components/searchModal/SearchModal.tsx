import React, { useState } from 'react';
import {Dock, DockIcon} from "@/components/ui/dock";
import {ArrowRight, X} from "lucide-react";

const SearchModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center z-50">
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold"
            >
                <X size={30} className={"text-yellow-500"}/>
            </button>
            <div className="flex items-center justify-center w-full h-2/4 p-5 rounded-lg relative space-x-2">
                <input
                    type="text"
                    className="w-4/12 bg-transparent border-0 border-b-2 border-yellow-500 text-yellow-500 font-bold text-3xl uppercase"
                    style={{outline: 'none', borderBottomWidth: '1px'}}
                />
                <ArrowRight size={40} className={"text-yellow-500"}/>
            </div>
            <div>
                <Dock className={"my-4"}>
                    <DockIcon size={40} style={{
                        background: `linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 69%)`,
                        border: '2px solid white'
                    }}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(7,129,250,1) 0%, rgba(3,45,87,1) 72%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(227,6,19,1) 0%, rgba(69,2,7,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(215,65,39,1) 0%, rgba(56,17,10,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(227,58,102,1) 0%, rgba(69,18,31,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(255,199,44,1) 0%, rgba(97,75,16,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(0,235,121,1) 0%, rgba(0,71,37,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(160,74,240,1) 0%, rgba(51,24,77,1) 86%)`}}/>
                    <DockIcon size={40}
                              style={{background: `linear-gradient(120deg, rgba(217,135,80,1) 0%, rgba(54,33,20,1) 86%)`}}/>
                </Dock>
            </div>
        </div>
    );
};

export default SearchModal;
