module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#e50914',
        'netflix-black': '#141414',
        'netflix-gray': '#808080',
        'netflix-dark': '#181818',
      },
      fontFamily: {
        'sans': ['Netflix Sans', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
