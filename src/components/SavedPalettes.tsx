import { useEffect, useState } from "react";
import ColorBox from "./ColorBox";
import Loader from "./ui/Loader";
import { TrashIcon } from "./icons";

export default function SavedPalettes() {
  const [palettes, setPalettes] = useState<string[][] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [paletteToDelete, setPaletteToDelete] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("palettes") || "[]");
    setPalettes(saved);
  }, []);

  const handleDeleteClick = (idx: number) => {
    setPaletteToDelete(idx);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (paletteToDelete === null || palettes === null) return;
    const newPalettes = palettes.filter((_, i) => i !== paletteToDelete);
    localStorage.setItem("palettes", JSON.stringify(newPalettes));
    setPalettes(newPalettes);
    setShowModal(false);
    setPaletteToDelete(null);
  };

  const handleCancel = () => {
    setShowModal(false);
    setPaletteToDelete(null);
  };

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
          className="group relative flex gap-4 flex-wrap border p-4 rounded shadow bg-white border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <button
            type="button"
            onClick={() => handleDeleteClick(i)}
            className="absolute -right-6 -top-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <TrashIcon />
          </button>
          {palette.map((hex, j) => (
            <ColorBox key={j} hex={hex} />
          ))}
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              ¿Eliminar paleta?
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              ¿Estás seguro de que deseas eliminar esta paleta? Esta acción no
              se puede deshacer.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Sí, eliminar
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
