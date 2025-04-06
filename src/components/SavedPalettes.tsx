import { useEffect, useState } from "react";
import ColorBox from "./ColorBox";
import Loader from "./ui/Loader";

export default function SavedPalettes() {
  const [palettes, setPalettes] = useState<string[][] | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("palettes") || "[]");
    setPalettes(saved);
  }, []);

  if (palettes === null) {
    return <Loader />;
  }

  if (palettes.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No has guardado ninguna paleta aún.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      {palettes.map((palette, i) => (
        <div
          key={i}
          className="flex gap-4 flex-wrap border p-4 rounded shadow bg-white border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          {palette.map((hex, j) => (
            <ColorBox key={j} hex={hex} />
          ))}
        </div>
      ))}
    </div>
  );
}
