/** @type {import('tailwindcss').Config} */
const { join } = require('path')
const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
