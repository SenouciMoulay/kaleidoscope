import { useState } from "react";
import { Color } from "./Color";
const colors = [
  "#FFFFFF",
  "#0781FA",
  "#E30613",
  "#D74127",
  "#E33A66",
  "#FFC72C",
  "#00EB79",
  "#A04AF0",
  "#D98750",
];

// extends input string
interface ColorChooseProps {
  id?: string;
  disabled?: boolean;
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

export function ColorChoose({
  id,
  disabled,
  onChange,
  defaultValue,
}: ColorChooseProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue ?? []);

  return (
    <div
      className="flex flex-row flex-wrap gap-2
    relative w-full h-12 overflow-hidden rounded-md"
    >
      {disabled && (
        <div className="absolute w-full h-full bg-gray-100 opacity-50 z-10" />
      )}
      {colors.map((color) => (
        <Color
          key={color}
          color={color}
          selected={selected.includes(color)}
          onChange={(select) => {
            if (select) {
              setSelected((prev) => [...prev, color]);
            } else {
              setSelected((prev) => prev.filter((c) => c !== color));
            }
            onChange?.(selected);
          }}
        />
      ))}
    </div>
  );
}
