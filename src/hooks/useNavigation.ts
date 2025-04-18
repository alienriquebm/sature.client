import { useEffect, useState } from "react";

type Route = {
  path: string;
  label: string;
  icon?: string;
};

const routes: Route[] = [
  { path: "/", label: "Inicio", icon: "🏠" },
  { path: "/saved", label: "Mis Paletas", icon: "💾" },
];

const normalizePath = (path?: string) =>
  path && path !== "/" ? path.replace(/\/+$/, "") : "/";

export default function useNavigation() {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return {
    currentPath,
    routes,
  };
}
