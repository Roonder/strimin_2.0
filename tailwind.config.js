import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/helpers/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        '3d': "url('/3d.jpg')"
      },
      colors: {
        red: {
          light: "#fc0050",
          neutral: "#b00038",
          dark: "#6d0020",
          veryDark: "#390011"
        },
        black: {
          light: "#161A1D",
          dark: "#0B090A"
        },
        neon: {
          purple: "#400ee1",
          pink: "#ff05bc",
          blue: "#05bcff"
        },
        green: {
          dark: "#4c6800",
          lime: "#c0ff14",
          light: "#f1ffcc"
        },
        gray: {
          neutral: "#B1A7A6",
          soft: "#D3D3D3",
          light: "#F5F3F4"
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}
