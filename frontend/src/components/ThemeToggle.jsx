import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Busca a preferência salva ou usa a do sistema
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || 
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-lg hover:scale-110 transition-transform"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}