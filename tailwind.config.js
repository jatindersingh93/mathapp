/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'math-blue': '#3B82F6',
        'math-green': '#10B981',
        'math-yellow': '#F59E0B',
        'math-purple': '#8B5CF6',
        'math-pink': '#EC4899',
        'math-orange': '#F97316',
      },
      fontFamily: {
        'math': ['Comic Neue', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}