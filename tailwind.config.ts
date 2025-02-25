import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'wup-green-easy': '#e5dfff',
        'wup-green': '#7754fa',
        'wup-green-hover': '#6548d9',
        'wup-white': '#FFFFFF',
        'wup-gray': '#F9FAFB',
        'wup-text': '#1F2937',
      },
    },
  },
  plugins: [],
} satisfies Config;
