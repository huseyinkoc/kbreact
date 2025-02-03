import { useState, useEffect } from 'react';
import { PiCheckBold } from 'react-icons/pi';
import cn from '../../utils/class-names';
import { usePresets } from '../../config/color-presets';
import {
  useColorPresetName,
  useColorPresets,
} from '../settings/use-theme-color';
import DrawerBlock from '../settings/drawer-block';

// 📌 Tema Yönetimi için `useState` Kullanıldı
export default function ColorOptions() {
  const COLOR_PRESETS = usePresets();
  const { setColorPresets } = useColorPresets();
  const { colorPresetName, setColorPresetName } = useColorPresetName();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 📌 Ekran genişliğine göre tema değiştir
  useEffect(() => {
    const handleResize = () => {
      setTheme(window.innerWidth < 768 ? 'dark' : 'light');
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // İlk yüklemede çalıştır
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DrawerBlock title="Colors">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {COLOR_PRESETS.map((preset) => (
          <div
            key={preset?.name}
            className="flex flex-col items-center justify-center gap-1"
          >
            <button
              title={preset?.name}
              onClick={() => {
                setColorPresets(preset?.colors);
                setColorPresetName(preset?.name.toLowerCase());
              }}
              className={cn(
                'grid h-auto w-full place-content-center gap-2 rounded-lg border-2 border-transparent py-1.5 shadow-sm transition duration-300 focus-visible:outline-none',
                colorPresetName?.toLowerCase() === preset?.name?.toLowerCase()
                  ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-100'
                  : 'hover:border-primary'
              )}
              style={{ backgroundColor: preset.colors.default }}
            >
              <PiCheckBold
                className={cn(
                  'h-6 w-6',
                  colorPresetName?.toLowerCase() === preset?.name?.toLowerCase()
                    ? 'text-white'
                    : 'text-transparent',
                  colorPresetName?.toLowerCase() ===
                    preset?.name?.toLowerCase() && preset.name === 'Black'
                    ? 'text-gray-0'
                    : ''
                )}
              />
            </button>
            <span
              className={
                colorPresetName?.toLowerCase() === preset?.name?.toLowerCase()
                  ? 'font-semibold'
                  : 'font-medium'
              }
              style={{ color: preset.colors.default }}
            >
              {theme === 'dark' && preset.name === 'Black'
                ? 'White'
                : preset.name}
            </span>
          </div>
        ))}
      </div>
    </DrawerBlock>
  );
}
