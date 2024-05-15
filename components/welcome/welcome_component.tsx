import { TextGenerateEffect } from "@/components/ui/textAuto";
import { motion } from 'framer-motion';
import { ChevronDown, ChevronDownCircle, ChevronRight } from 'lucide-react';
import React from 'react';
import { useEffect, useState } from 'react';

const WelcomeComponent: React.FC<{ onDiscoverClick: () => void }> = ({ onDiscoverClick }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [imDumb, setImDumb] = useState(false);

    const isMobile = () => {
        if (typeof window !== "undefined") {
            const aspectRatio = window.innerWidth / window.innerHeight;
            return aspectRatio < 1;
        }
        return false;
    }

    useEffect(() => {
        // after 3 seconds, show the button
        const timeout = setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setIsScrollable(true), 2000);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        // 2 sec after isVisible => isScrollable
        if (isVisible) {
            const timeout = setTimeout(() => setIsScrollable(true), 2000);

            // if after 5 sec user didn't click, show a button
            const timeout2 = setTimeout(() => {
                setImDumb(true);
            }
                , 8000);
            return () => {
                clearTimeout(timeout);
                clearTimeout(timeout2);
            }
        }

    }, [isVisible]);


    const animationRef = React.useRef<{
        complete: () => void;
        pause: () => void;
    }>(null);



    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black h-screen w-screen"
            // onWheel={isScrollable ? onDiscoverClick : undefined}
            onClick={() => {
                if (!isVisible) {
                    setIsVisible(true);
                    animationRef.current?.complete();
                }
                else {
                    onDiscoverClick();
                }
            }}
            onKeyDown={(e) => {
                if (
                    e.key ===
                    "Enter"
                ) {
                    if (!isVisible) {
                        setIsVisible(true);
                        animationRef.current?.complete();
                    }
                    else {
                        onDiscoverClick();
                    }
                }
            }}
        >
            <div className="flex flex-col items-center justify-center w-10/12 h-full" style={{
                // if mobile, make the text smaller
                zoom: isMobile() ? 0.5 : 1
            }}>
                <TextGenerateEffect
                    className="text-yellow-500"
                    words="Vous vous apprêtez à vivre une expérience visuelle et auditive."
                    ref={animationRef}
                />
                <motion.button
                    initial={{ y: 100, opacity: 0 }}
                    animate={isVisible ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: isVisible ? 0 : 1 }}
                    onClick={onDiscoverClick}
                    className="flex items-center justify-center hover:text-yellow-600 text-4xl font-bold mt-10 text-yellow-500 cursor-pointer focus:outline-none hover:scale-110"
                >
                    <ChevronDownCircle size={40} />
                </motion.button>

                {/* text button saying cliqué ici */}
                {imDumb && <motion.button
                    initial={{ y: 100, opacity: 0 }}
                    animate={isVisible ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: isVisible ? 0 : 1 }}
                    onClick={onDiscoverClick}
                    className="flex items-center justify-center hover:text-yellow-600 text-4xl font-bold mt-10 text-yellow-500 cursor-pointer focus:outline-none hover:scale-110"
                >
                    <span className="ml-2">Cliquez ici pour continuer</span>
                </motion.button>}


            </div>
        </div>
    );
};

export default WelcomeComponent;
