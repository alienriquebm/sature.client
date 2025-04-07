import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "normal" | "small";
type ButtonProps = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export default function Button({
  onClick,
  className,
  children,
  variant = "primary",
  size = "normal",
  fullWidth = false,
}: ButtonProps) {
  const variationsClasses = {
    primary:
      "bg-gray-800 text-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:hover:text-gray-200",
    secondary:
      "bg-transparent text-gray-800 border border-gray-400 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:hover:text-gray-200",
  };

  const sizeClasses = {
    normal: "px-4 py-2 text-sm",
    small: "px-3 py-1 text-xs",
  };

  const buttonClasses = cn(
    "rounded transition duration-200 ease-in-out hover:cursor-pointer",
    className
  );

  return (
    <button
      onClick={onClick}
      className={cn(
        variationsClasses[variant],
        sizeClasses[size],
        buttonClasses,
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
}
