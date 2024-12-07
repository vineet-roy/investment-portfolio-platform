const flowbite = require("flowbite-react/tailwind");
const tailwind = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#358B10",
          100: "#64C13C",
          200: "#4CBB17",
          300: "#358B10"
        },
        red: {
          50: "#EB8A9D",
          100: "#D2042D",
          200: "#81041D",
        },
        blue: {
          10: "#84AEDE",
          50: "#3B88E1",
          100: "#1876E2",
          200: "#07305E",
        },
        colorBgPrimary: "var(--color-bg-primary)",
        colorBgSecondary: "var(--color-bg-secondary)",
        colorBgThird: "var(--color-bg-third)",
        colorTextPrimary: "var(--color-text-primary)",
        colorTextGray: "var(--color-text-gray)",
        colorTextGraySecond: "var(--color-text-gray-second)",
        colorBorder: "var(--color-border)",
        colorBorderNone: "var(--color-border-none)",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        9: "9 9 0%",
      },
      height: {
        70: "70px",
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
