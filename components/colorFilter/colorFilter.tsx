import { useState } from 'react';

export const ColorFilter = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleColorClick = (color: string) => {
        setSelectedColor(selectedColor === color ? null : color);
    };

    return (
        <div className={'grid grid-cols-8 fixed top-3/4 left-4'}>
            <span
                className={`w-16 h-3 bg-blue-600 rounded-l transition-transform duration-300 ease-in-out ${
                    selectedColor === 'blue' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px]'
                }`}
                onClick={() => handleColorClick('blue')}
            />
            <span
                className={`w-16 h-3 bg-green-600 transition-transform duration-300 ease-in-out ${
                    selectedColor === 'green' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('green')}
            />
            <span
                className={`w-16 h-3 bg-yellow-600 transition-transform duration-300 ease-in-out ${
                    selectedColor === 'yellow' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('yellow')}
            />
            <span
                className={`w-16 h-3 bg-orange-600 transition-transform duration-300 ease-in-out ${
                    selectedColor === 'orange' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('orange')}
            />
            <span
                className={`w-16 h-3 bg-red-600 transition-transform duration-300 ease-in-out ${
                    selectedColor === 'red' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('red')}
            />
            <span
                className={`w-16 h-3 bg-purple-600 transition-transform duration-300 ease-in-out ${
                    selectedColor === 'purple' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('purple')}
            />
            <span
                className={`w-16 h-3 bg-white transition-transform duration-300 ease-in-out ${
                    selectedColor === 'white' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px] '
                }`}
                onClick={() => handleColorClick('white')}
            />
            <span
                className={`w-16 h-3 bg-black border border-white rounded-r transition-transform duration-300 ease-in-out ${
                    selectedColor === 'black' ? 'transform translate-y-[-20px] rounded-md scale-110' : 'hover:translate-y-[-2px]'
                }`}
                onClick={() => handleColorClick('black')}
            />
        </div>
    );
};
