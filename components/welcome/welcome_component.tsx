import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from "@/components/ui/textAuto";

const WelcomeComponent: React.FC<{ onDiscoverClick: () => void }> = ({ onDiscoverClick }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
            <div className="flex flex-col items-center justify-center w-10/12 h-full">
                <TextGenerateEffect words="Vous vous apprêtez à vivre une expérience visuelle et auditive." className="pl-20" />
                <motion.button
                    initial={{ y: 100, opacity: 0 }}
                    animate={isVisible ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: isVisible ? 0 : 1 }}
                    className="w-36 h-12 rounded-md bg-white font-bold text-black text-xl mt-20"
                    onClick={onDiscoverClick}
                >
                    Découvrir
                </motion.button>
            </div>
        </div>
    );
};

export default WelcomeComponent;
