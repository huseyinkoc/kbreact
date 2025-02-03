import { useWindowSize } from 'react-use';
import { useState, useEffect } from 'react';

export const presetLight = {
  lighter: '#f1f1f1',
  light: '#666666',
  default: '#111111',
  dark: '#000000',
  foreground: '#ffffff',
};

export const presetDark = {
  lighter: '#222222',
  light: '#929292',
  default: '#f1f1f1',
  dark: '#ffffff',
  foreground: '#111111',
};

// Varsayılan renkler
export const DEFAULT_PRESET_COLORS = {
  lighter: '#d7e3fe',
  light: '#608efb',
  default: '#3872fa',
  dark: '#1d58d8',
  foreground: '#ffffff',
};

export const DEFAULT_PRESET_COLOR_NAME = 'Blue';

// 📌 `usePresets` Hook'unu Güncelle (React İçin)
export const usePresets = () => {
  const { width } = useWindowSize(); // 🔹 Ekran genişliğini takip et
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // ✅ Temayı sakla

  // ✅ Ekran genişliğine göre tema belirleme
  useEffect(() => {
    if (width < 768) {
      setTheme('dark'); // Küçük ekranlarda Dark Mod
    } else {
      setTheme('light'); // Büyük ekranlarda Light Mod
    }
  }, [width]);

  return [
    {
      name: DEFAULT_PRESET_COLOR_NAME,
      colors:
        theme === 'dark'
          ? {
            lighter: presetDark.lighter,
            light: presetDark.light,
            default: presetDark.default,
            dark: presetDark.dark,
            foreground: presetDark.foreground,
          }
          : DEFAULT_PRESET_COLORS, // Varsayılan renkler
    },
    {
      name: 'Black',
      colors: {
        lighter: presetDark.lighter,
        light: presetDark.light,
        default: presetDark.default,
        dark: presetDark.dark,
        foreground: presetDark.foreground,
      },
    },
  ];
};
