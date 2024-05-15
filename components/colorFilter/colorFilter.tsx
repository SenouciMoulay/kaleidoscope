import { useState } from 'react';

export const ColorFilter = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const colors = ['blue', 'green', 'yellow', 'orange', 'red', 'purple', 'white', 'black'];

    const handleColorClick = (color: string) => {
        setSelectedColor(selectedColor === color ? null : color);
    };

    return (
        <div className={'grid grid-cols-8 pb-44'}>
            {colors.map((color, index, array) => (
                <span
                    key={color}
                    className={`w-16 h-3.5 ${
                        color === 'white' || color === 'black' ? `bg-${color} border border-white` : `bg-${color}-600`
                    } transition-all duration-500 ease-in-out ${
                        selectedColor === color ? 'transform translate-y-[-20px] rounded-md scale-110' :
                            'hover:translate-y-[-2px]'
                    } ${
                        (selectedColor === array[index - 1] && index > 0) ? 'rounded-l-md' : ''
                    } ${
                        (selectedColor === array[index + 1] && index < array.length - 1) ? 'rounded-r-md' : ''
                    }`}
                    style={{
                        backgroundColor: color,
                    }}
                    onClick={() => handleColorClick(color)}
                />
            ))}
        </div>
    );
};
