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
    <div className="flex flex-col w-full items-center justify-between bg-white shadow rounded text-center dark:bg-gray-700 dark:text-white dark:shadow-gray-500 hover:shadow-lg transition duration-200 ease-in-out sm:w-auto">
      <div
        className="w-full h-32 rounded-t sm:w-32 sm:rounded sm:mt-4 sm:mx-4 mb-2"
        style={{ backgroundColor: hex }}
      ></div>
      <div className="p-4">
        <p className="font-mono text-lg mb-2">{hex}</p>
        <Button onClick={handleCopy} size="small">
          Copiar
        </Button>
      </div>
    </div>
  );
}
