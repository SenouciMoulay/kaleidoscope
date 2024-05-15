import React, { useState, useEffect } from "react";

export function FlareCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastEvent, setLastEvent] = useState(null);

  const [isPointer, setIsPointer] = useState(false);


  useEffect(() => {
    const handleMouseMove = (event?: any) => {
      if (event) {
        setLastEvent(event);
      }
      const e = event ?? lastEvent;
      if (!e) return;
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target;

      setIsPointer(
        target.classList.contains("cursor-pointer") ||
        target.parentElement?.classList.contains("cursor-pointer")
      );
      // hide the default cursor
      target.style.cursor = "none";

    };

    window.addEventListener("mousemove", handleMouseMove);
    const interval = setInterval(() => {
      handleMouseMove();
    }, 1000);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
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
      }}
    />
  );
}
