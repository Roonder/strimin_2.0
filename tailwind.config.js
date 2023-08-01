/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        red: {
          light: "#E5383B",
          neutral: "#BA181B",
          dark: "#A4161A",
          veryDark: "#660708"
        },
        black: {
          light: "#161A1D",
          dark: "#0B090A"
        },
        gray: {
          neutral: "#B1A7A6",
          soft: "#D3D3D3",
          light: "#F5F3F4"
        }
      }
    },
  },
  plugins: [],
}
