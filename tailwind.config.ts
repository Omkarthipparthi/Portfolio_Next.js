import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#f0f1ff',
          100: '#e3e4ff',
          200: '#c9ccff',
          300: '#a5a8ff',
          400: '#8085ff',
          500: '#635cff',
          600: '#4b3cf7',
          700: '#3f2ce0',
          800: '#3527b5',
          900: '#302790',
        },
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        glass: '0 8px 24px hsl(240 5% 15% / 0.15)',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
export default config
