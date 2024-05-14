import React, { useRef, useState } from 'react';
import { Dock, DockIcon } from "@/components/ui/dock";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

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
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: (args?: { text: string | undefined, color: string | undefined }) => void;
}

const SearchModal = (
    {
        isOpen,
        onClose,
    }: SearchModalProps
) => {

    const searchRef = useRef<HTMLInputElement>(null);

    const [searchValue, setSearchValue] = useState<string | undefined>();
    const [selectedColor, setSelectedColor] = useState<string | undefined>();


    function search() {
        onClose({
            text: searchValue,
            color: selectedColor
        });
    }


    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            searchRef.current?.blur();
            search();
        }
    }

    function handleColorSelect(color: string) {
        if (selectedColor === color) {
            setSelectedColor(undefined);
        }
        else {
            setSelectedColor(color);
        }
    }

    // on open focus on search input
    if (isOpen) {
        // set the value of the search input to the search terms
        setTimeout(() => {
            if (!searchRef.current) return;
            searchRef.current!.focus();
        }, 0);
    }

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex flex-col items-center justify-center z-50 space-y-44"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={search}
                >
                    <motion.button
                        onClick={() => onClose()}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <X size={30} className={"text-yellow-500"} />
                    </motion.button>
                    <motion.div
                        className="flex flex-col items-center justify-center w-4/12 space-y-6"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center w-full">
                            <input
                                type="text"
                                className="w-full bg-transparent border-0 border-b-2 border-yellow-500 text-yellow-500 font-bold text-3xl uppercase placeholder-yellow-500 p-2"
                                style={{ outline: 'none', borderBottomWidth: '1px' }}
                                ref={searchRef}
                                onKeyDown={handleKeyDown}
                                aria-label="Rechercher"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <ArrowRight size={40} className={"text-yellow-500"} onClick={search} />
                        </div>
                    </motion.div>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center w-4/12 mt-12" // Ajout de mt-12 pour espace vertical
                    >
                        <Dock className={"my-4"}>
                            <DockIcon size={40} style={{
                                background: `linear-gradient(120deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 69%)`,
                                border: '2px solid white'
                            }} />
                            {colorsItems.map((color, index) => (
                                <DockIcon
                                    key={index}
                                    size={selectedColor === color.main ? 65 : 40}
                                    style={{
                                        background: `linear-gradient(120deg, ${color.main} 0%, ${color.secondary} 86%)`
                                    }}
                                    onClick={() => handleColorSelect(color.main)}
                                />
                            ))}
                        </Dock>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
