import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f6fb',
          500: '#2e4057',
          600: '#25334a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
