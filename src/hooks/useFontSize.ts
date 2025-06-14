
import { useState, useEffect } from "react";

type FontSize = "text-base" | "text-lg" | "text-xl";

const fontSizeMap: Record<FontSize, string> = {
  "text-base": "font-size-base",
  "text-lg": "font-size-large",
  "text-xl": "font-size-xlarge",
};

export function useFontSize() {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const stored = localStorage.getItem("app-font-size");
    return (stored as FontSize) || "text-base";
  });

  useEffect(() => {
    document.body.classList.remove(
      "font-size-base",
      "font-size-large",
      "font-size-xlarge"
    );
    document.body.classList.add(fontSizeMap[fontSize]);
    localStorage.setItem("app-font-size", fontSize);
  }, [fontSize]);

  const increase = () => {
    setFontSize((prev) =>
      prev === "text-base"
        ? "text-lg"
        : prev === "text-lg"
        ? "text-xl"
        : "text-xl"
    );
  };
  const decrease = () => {
    setFontSize((prev) =>
      prev === "text-xl"
        ? "text-lg"
        : prev === "text-lg"
        ? "text-base"
        : "text-base"
    );
  };
  const reset = () => setFontSize("text-base");

  return { fontSize, increase, decrease, reset };
}
