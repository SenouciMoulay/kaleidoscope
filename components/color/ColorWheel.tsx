import { Color } from "./Color"
import React, { useState } from "react";
const colors = [
  "#00b572",
  "#ffa901",
  "#8b47b0",
  "#fcff00",
  "#ff3526",
  "#2e89d8",
  "#F0F0F0"
];

interface ColorWheelProps {
  multiple?: boolean;
  selectedColors?: string[];
  onChange?: (colors: string[]) => void;
}

export function ColorWheel({
  multiple = true,
  selectedColors: defaultColors = [],
  onChange,
}: ColorWheelProps) {

  const [selectedColors, setSelectedColors] = useState<string[]>(defaultColors);

  return (
    <div className="flex flex-wrap justify-center">
      {colors.map((color) => <Color
        key={color}
        color={color}
        selected={selectedColors.includes(color)}
        onPress={() => {
          if (multiple) {
            if (selectedColors.includes(color)) {
              setSelectedColors(selectedColors.filter((c) => c !== color));
            } else {
              setSelectedColors([...selectedColors, color]);
            }
          } else {
            setSelectedColors([color]);
          }
          onChange?.(selectedColors);
        }}
      />)}
    </div>
  );


}
