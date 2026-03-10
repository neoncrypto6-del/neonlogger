
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'purple-neon': '#8b5cf6',
        'gold-neon': '#f59e0b',
        'orange-neon': '#ff6b35',
      },
    },
  },
  plugins: [],
}
