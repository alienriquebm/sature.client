import { useCallback, useEffect, useState } from 'react';

type Mode = 'light' | 'dark' | 'auto';

export default function useDarkMode() {
  const [mode, setMode] = useState<Mode>('light');

  const setChangeMode = useCallback((value: Mode) => {
    document.documentElement.classList.remove('dark');
    if (value === 'dark') {
        document.documentElement.classList.add('dark');
      } else if (value === 'light') {
        document.documentElement.classList.remove('dark');
      } else if (value === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
      }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Mode | null;
    const resolved = saved || 'light';
    setMode(resolved);
    setChangeMode(resolved);
  }, []);

  const changeMode = (value: Mode) => {
    setMode(value);
    localStorage.setItem('theme', value);
    setChangeMode(value);
  };
  return { mode, changeMode };
}
