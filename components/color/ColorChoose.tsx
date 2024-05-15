import { useState } from "react";
import { Color } from "./Color";
import { colors } from "../movie/movie_form";

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
          key={color.hex}
          color={color.hex}
          selected={selected.includes(color.hex)}
          onChange={(select) => {
            if (select) {
              setSelected((prev) => [...prev, color.hex]);
            } else {
              setSelected((prev) => prev.filter((c) => c !== color.hex));
            }
            onChange?.(selected);
          }}
        />
      ))}
    </div>
  );
}
