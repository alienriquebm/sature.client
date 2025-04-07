import { useState } from "react";
import ColorBox from "./ColorBox";
import Button from "./ui/Button";
import toast from "react-hot-toast";

const generateHex = (): string =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

export default function PaletteActions() {
  const [colors, setColors] = useState<string[]>(
    Array.from({ length: 5 }, generateHex)
  );

  const regenerate = () => {
    setColors(Array.from({ length: 5 }, generateHex));
  };

  const savePalette = () => {
    const saved = JSON.parse(localStorage.getItem("palettes") || "[]");
    saved.push(colors);
    localStorage.setItem("palettes", JSON.stringify(saved));
    toast.success(`Tu paleta ha sido guardada`);
  };

  return (
    <div className="flex flex-col w-full items-center gap-6">
      <div className="flex w-full flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4">
        {colors.map((hex, idx) => (
          <ColorBox key={idx} hex={hex} />
        ))}
      </div>

      <div className="w-full flex flex-col gap-4 mt-4 sm:flex-row justify-center">
        <Button onClick={regenerate}>🎲 Generar Nueva Paleta</Button>
        <Button onClick={savePalette} variant="secondary">
          💾 Guardar Paleta
        </Button>
      </div>
    </div>
  );
}
