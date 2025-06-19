/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dancing-script': ['var(--font-dancing-script)'],
      },
    },
  },
  plugins: [],
}
