/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/**/*.{js,ts,jsx,tsx}" // RizzUI bileşenlerinin Tailwind tarafından algılanması için
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"], // Tailwind'in `font-lexend` sınıfını algılamasını sağlar
        inter: ["Inter", "sans-serif"], // Tailwind'in `font-inter` sınıfını algılamasını sağlar
      },
      fontSize: {
        '4xl': '2.25rem', // Varsayılan
        '5xl': '3rem',
      },
      colors: {
        primary: {
          DEFAULT: "#1E40AF", // Özel `primary` rengi
          foreground: "#FFFFFF", // `text-primary-foreground` rengi
        },
        "blue-lighter": "#E0F2FE", // Özel olarak tanımlanan mavi tonu
        "red-dark": "#991B1B", // Özel `red-dark` rengi (örn. Tailwind'in `red-800` rengi)
      },
    },
  },
  plugins: [],
};
