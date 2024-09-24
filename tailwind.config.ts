/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#8e44ad',
        secondary: '#27ae60',
        negative: '#ecf0f1',
        positive: '#f4f4f4'
      }
    }
  },
  plugins: [
    '@tailwindcss/typography',
    '@tailwindcss/forms',
    '@tailwindcss/aspect-ratio',
    '@tailwindcss/container-queries',
    '@tailwindcss/line-clamp'
  ]
};
