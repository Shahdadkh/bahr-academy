/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "false",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          400: "var(--theme-background4)",
          500: "var(--theme-background5)",
          550: "var(--theme-background550)",
          600: "var(--theme-background6)",
          700: "var(--theme-background7)",
          750: "var(--theme-background750)",
          800: "var(--theme-background8)",
          900: "var(--theme-background9)",
        },
        textHead: {
          800: "var(--theme-text-head8)",
          900: "var(--theme-text-head9)",
        },
        toz: "var(--theme-toz)",
        textHover: {
          200: "var(--theme-text2)",
          300: "var(--theme-text3)",
          400: "var(--theme-text4)",
          500: "var(--theme-text5)",
          600: "var(--theme-text6)",
          700: "var(--theme-text7)",
          800: "var(--theme-text8)",
          900: "var(--theme-text9)",
        },
        button: {
          200: "var(--theme-button2)",
          300: "var(--theme-button3)",
          400: "var(--theme-button4)",
          500: "var(--theme-button5)",
          600: "var(--theme-button6)",
          700: "var(--theme-button7)",
          800: "var(--theme-button8)",
          900: "var(--theme-button9)",
        },
      },
      fontFamily: {
        iran: ["IRANSans"],
      },
    },
  },
  plugins: [],
};
