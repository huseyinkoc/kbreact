import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "jotai";
import { siteConfig } from "../config/site_config";

// ✅ ThemeContext oluşturuldu.
export const ThemeContext = createContext({
  theme: "light",
  setTheme: (theme: string) => { },
});

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<string>(siteConfig.mode || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Jotai Provider aynen korunarak eklendi.
export function JotaiProvider({ children }: React.PropsWithChildren<{}>) {
  return <Provider>{children}</Provider>;
}
