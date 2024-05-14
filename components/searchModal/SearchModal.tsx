import React, { useRef, useState } from 'react';
import { ColorFilter } from "@/components/colorFilter/colorFilter";
import { Dock, DockIcon } from "@/components/ui/dock";



const colorsItems = [
    {
        main: "#FFFFFF",
        secondary: "#000000",
    },
    {
        main: "#0781FA",
        secondary: "#032D57",
    },
    {
        main: "#E30613",
        secondary: "#450207",
    },
    {
        main: "#D74127",
        secondary: "#38110A",
    },
    {
        main: "#E33A66",
        secondary: "#45121F",
    },
    {
        main: "#FFC72C",
        secondary: "#614B10",
    },
    {
        main: "#00EB79",
        secondary: "#004725",
    },
    {
        main: "#A04AF0",
        secondary: "#33184D",
    },
    {
        main: "#D98750",
        secondary: "#362114",
    },

]


interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedColor?: string;
    onSelectColor?: (color: string | undefined) => void;
    searchTerms?: string;
    onSearch?: (searchTerms: string) => void;
}

const SearchModal = (
    {
        isOpen,
        onClose,
        selectedColor,
        onSelectColor,
        searchTerms,
        onSearch,
    }: SearchModalProps
) => {

    const searchRef = useRef<HTMLInputElement>(null);

    function search() {
        if (searchRef.current) {
            onSearch?.(searchRef.current.value);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            search();
        }
    }

    function handleColorSelect(color: string) {
        if (selectedColor === color) {
            onSelectColor?.(undefined);
        }
        else {
            onSelectColor?.(color);
        }
    }



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center z-50" onClick={onClose}>
            <div className="flex items-center justify-center w-4/12 h-2/4 p-5 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                <input
                    type="text"
                    className="w-full bg-transparent border-0 border-b-2 border-yellow-500 text-yellow-500 font-bold text-3xl"
                    style={{ outline: 'none', borderBottomWidth: '1px' }}
                    ref={searchRef}
                    onKeyDown={handleKeyDown}
                    aria-label="Rechercher"
                    value={searchTerms}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-4/12 h-2/4 p-5 rounded-lg relative" onClick={(e) => e.stopPropagation()}>
                <Dock className={"my-4"}>
                    {
                        colorsItems.map((color, index) => (
                            <DockIcon
                                key={index}
                                size={selectedColor === color.main ? 65 : 40}
                                // className='transition-all duration-300 ease-in-out cursor-pointer'
                                style={{
                                    background: `linear-gradient(120deg, ${color.main} 0%, ${color.secondary} 86%)`
                                }}
                                onClick={() => handleColorSelect(color.main)}

                            />
                        ))
                    }
                </Dock>
            </div>
        </div>
    );
};

export default SearchModal;
