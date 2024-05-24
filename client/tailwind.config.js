/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,scss}",
  ],
  theme: {
    extend: {
      spacing: {
        '3/10': '30%',
      },
      colors: {
        'main-color': '#52D82B',
        'text-color': '#3D70B2',
      },
      
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
