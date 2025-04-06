import useDarkMode from "../hooks/useDarkMode";
import useNavigation from "../hooks/useNavigation";
import { cn } from "../utils/cn";
import { layoutContainer } from "../utils/tw";

const optionClasses =
  "flex items-center justify-center w-full h-full text-sm bg-black dark:bg-white dark:text-black text-white px-3 py-1 rounded";

export default function Header() {
  const { mode, changeMode } = useDarkMode();
  const { routes, currentPath } = useNavigation();

  return (
    <header className="w-full border-b border-gray-300 h-16 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 text-black dark:text-white">
      <div
        className={cn(
          "w-full px-6 h-full flex justify-between items-center",
          layoutContainer
        )}
      >
        <h1 className="text-2xl font-bold tracking-tight">Saturé</h1>
        <div className="flex items-center gap-4">
          {routes.map(({ path, label, icon }) => (
            <a
              key={path}
              href={path}
              className={cn(
                "text-sm px-3 py-1 rounded transition flex items-center sm:gap-2",
                currentPath === path
                  ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
          <select
            value={mode}
            onChange={(e) =>
              changeMode(e.target.value as "light" | "dark" | "auto")
            }
            className="text-sm bg-gray-800 dark:bg-white dark:text-gray-800 text-white px-3 py-1 rounded flex items-center justify-center"
          >
            <option value="light" className={optionClasses}>
              ☀️ Claro
            </option>
            <option value="dark" className={optionClasses}>
              🌙 Oscuro
            </option>
            <option value="auto" className={optionClasses}>
              🌓 Automático
            </option>
          </select>
        </div>
      </div>
    </header>
  );
}
