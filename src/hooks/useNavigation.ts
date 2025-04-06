import { useEffect, useState } from "react";


type Route = {
    path: string;
    label: string;
    icon?: string;
}

const routes: Route[] = [
    { path: '/', label: 'Inicio', icon:'🏠' },
    { path: '/saved', label: 'Mis Paletas', icon: '💾' },
]

export default function useNavigation() {

    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
      setCurrentPath(window.location.pathname);
    }, []);
  
    const handleNavigation = (path: string) => {
      setCurrentPath(path);
      window.history.pushState({}, '', path);
    };

  return (
    {
        currentPath,
        routes
    }
  )
}
