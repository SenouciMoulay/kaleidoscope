import React, { useState, useEffect } from "react";

export function FlareCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isPointer, setIsPointer] = useState(false);

  const [hideCursor, setHideCursor] = useState(false);


  useEffect(() => {
    const handleMouseMove = (e?: any) => {

      if (!e) return;
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;


      setIsPointer(
        target.classList.contains("cursor-pointer") ||
        target.parentElement?.classList.contains("cursor-pointer")
      );

      setHideCursor(
        target.classList.contains("cursor-none") ||
        target.parentElement?.classList.contains("cursor-none")
      );


      // hide the default cursor
      target.style.cursor = "none";

    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate the size of the flare based on whether the cursor is over a clickable element.
  const flareSize = isPointer ? 10 : 30;

  // Adjust the cursor position to create a visual effect when over a clickable element.
  const cursorStyle = isPointer ? { left: "-100px", top: "-100px" } : {};


  // Render the custom cursor element with dynamic styles based on cursor state.
  return (
    <div
      className={`flare ${isPointer ? "pointer" : ""}`}
      style={{
        ...cursorStyle,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${flareSize}px`,
        height: `${flareSize}px`,
        display: hideCursor ? "hidden" : "visible",
      }}
    />
  );
}
