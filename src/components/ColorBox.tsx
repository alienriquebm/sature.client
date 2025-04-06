import Button from "./ui/Button";
import toast from "react-hot-toast";

type Props = {
  hex: string;
};

export default function ColorBox({ hex }: Props) {
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    console.log(hex);
    toast.success(`Color ${hex} copiado`);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white shadow rounded p-4 text-center dark:bg-gray-700 dark:text-white dark:shadow-gray-800 hover:shadow-lg transition duration-200 ease-in-out">
      <div
        className="w-32 h-32 rounded mb-2"
        style={{ backgroundColor: hex }}
      ></div>
      <p className="font-mono text-lg mb-2">{hex}</p>
      <Button onClick={handleCopy} size="small">
        Copiar
      </Button>
    </div>
  );
}
