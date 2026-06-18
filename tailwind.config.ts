import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        palace: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d7b0",
          300: "#e9bc7b",
          400: "#df9d4d",
          500: "#d4852e",
          600: "#c06b24",
          700: "#9f5221",
          800: "#814221",
          900: "#6a381d",
          950: "#3a1b0d",
        },
        ink: {
          50: "#f6f5f0",
          100: "#e8e5db",
          200: "#d2ccb5",
          300: "#b8af89",
          400: "#a29467",
          500: "#8c7c55",
          600: "#756548",
          700: "#5e4e3b",
          800: "#4f4234",
          900: "#453a30",
          950: "#261f18",
        },
      },
      fontFamily: {
        serif: ["Noto Serif SC", "STSong", "SimSun", "serif"],
        sans: ["PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
