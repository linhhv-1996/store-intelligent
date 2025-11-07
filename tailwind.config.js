/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './error.vue'
  ],
  theme: {
    extend: {
      maxWidth: {
        '5xl': '1000px'
      },
      fontFamily: {
        'tech': ['"Exo 2"', 'monospace']
      }
    }
  },
  plugins: []
}
