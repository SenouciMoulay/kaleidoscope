import { cp } from "fs";
import React from "react";
interface ColorProps {
  id?: string;
  color?: string;
  onChange?: (selected: boolean) => void;
  selected?: boolean;
}

/// <reference types="react" />
export function Color({ color, onChange, selected }: ColorProps) {
  // if color is "F0F0F0" display a circle half white half black (left half white, right half black)

  return (
    <div
      className={`w-8 h-8 m-2 rounded-full hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-110 shadow-md cursor-pointer hover:-translate-y-1 ${
        selected ? "scale-125  " : ""
      } flex flex-row relative`}
      onClick={() => onChange?.(!selected)}
      style={{ backgroundColor: color }}
    >
      {color === "#FFFFFF" && (
        <>
          <div
            className="w-4 h-8 rounded-l-full"
            style={{ backgroundColor: "black" }}
          />
          <div
            className="w-4 h-8 rounded-r-full "
            style={{ backgroundColor: "white" }}
          />
        </>
      )}
      {selected && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center absolute">
          <div className="w-4 h-4 rounded-full flex flex-row relative bg-white">
            {color === "#FFFFFF" && (
              <>
                <div
                  className="w-4 h-4 rounded-l-full"
                  style={{ backgroundColor: "white" }}
                />
                <div
                  className="w-4 h-4 rounded-r-full "
                  style={{ backgroundColor: "black" }}
                />
              </>
            )}
            <div />
          </div>
        </div>
      )}
    </div>
  );
}
