import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";
type Density = "comfortable" | "compact";

type Ctx = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
  density: Density;
  setDensity: (d: Density) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

function readInitial(key: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [density, setDensityState] = useState<Density>("comfortable");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  // Hydrate on mount from localStorage — avoids SSR mismatch.
  useEffect(() => {
    setThemeState((readInitial("slic-theme", "light") as Theme) ?? "light");
    setDensityState((readInitial("slic-density", "comfortable") as Density) ?? "comfortable");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const compute = () => (theme === "system" ? (media.matches ? "dark" : "light") : theme);
    const apply = () => {
      const r = compute();
      setResolved(r);
      root.classList.toggle("dark", r === "dark");
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("density-compact", density === "compact");
  }, [density]);

  const setTheme = (t: Theme) => {
    localStorage.setItem("slic-theme", t);
    setThemeState(t);
  };
  const setDensity = (d: Density) => {
    localStorage.setItem("slic-density", d);
    setDensityState(d);
  };

  return (
    <ThemeCtx.Provider value={{ theme, resolvedTheme: resolved, setTheme, density, setDensity }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
