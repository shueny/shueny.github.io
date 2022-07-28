/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        red: {
          primary: '#FF0037',
          secondary: '#9E1F63',
          darken: '#B10026',
          100: '#6e0002',
          90: '#9d0003',
          80: '#b80003',
          70: '#d71920',
          60: '#e52630',
          50: '#f24c4f',
          40: '#f46f71',
          30: '#fd999a',
          20: '#fcc3c4',
          10: '#fee1e2',
        },
        blue: {
          100: '#002a7e',
          90: '#00349d',
          80: '#003db8',
          70: '#0547cd',
          60: '#1e5ede',
          50: '#578aef',
          40: '#6f9bf4',
          30: '#95b7fc',
          20: '#c3d6fc',
          10: '#e1ebfe',
        },
        gray: {
          100: '#151515',
          90: '#212121',
          80: '#303030',
          70: '#424242',
          60: '#5e5e5e',
          50: '#8a8a8a',
          40: '#adadad',
          35: '#c4c4c4',
          30: '#c9c9c9',
          20: '#e0e0e0',
          10: '#f2f2f2',
          d8: '#D8D8D8',
          '32': '#323232',
        },
        orange: {
          50: '#ff7633',
        },
        yellow: {
          50: '#faba2a',
        },
        white: {
          emphasis: 'rgba(255, 255, 255, 1.0)',
          primary: 'rgba(255, 255, 255, .92)',
          secondary: 'rgba(255, 255, 255, .60)',
          tertiary: 'rgba(255, 255, 255, .47)',
          disabled: 'rgba(255, 255, 255, .28)',
        },
        black: {
          emphasis: 'rgba(0, 0, 0, 1.0)',
          primary: 'rgba(0, 0, 0, .92)',
          secondary: 'rgba(0, 0, 0, .65)',
          tertiary: 'rgba(0, 0, 0, .54)',
          disabled: 'rgba(0, 0, 0, .30)',
        },
        shadow: '0px 20px 40px rgba(3, 3, 3, 0.2)',
        'red-trend': '#BD1C1A',
      },
      boxShadow: {
        normal: '0px 20px 40px rgba(3, 3, 3, 0.1)',
      },
      dropShadow: {
        normal: '0px 20px 40px rgba(3, 3, 3, 0.1)',
      },
      backdropBlur: {
        '1.5xl': '2rem',
      },
      blur: {
        '1.5xl': '2rem',
      },
      backdropBlur: {
        '1.5xl': '2rem',
      },
      blur: {
        '1.5xl': '2rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.625rem',
        lg: '1.25rem',
        full: '9999px',
      },
      fontSize: {
        sm: ['0.875rem', '1.25rem'],
        base: ['1rem', '1.375rem'],
        lg: ['1.125rem', '1.75rem'], // 18px
        xl: ['1.5rem', '2rem'],
        '2xl': ['2rem', '3rem'],
        '3xl': ['2.25rem', '3.25rem'], // 36px
        '4xl': ['2.5rem', '3.25rem'], // 40px
        '5xl': '2.75rem',
      },
      lineHeight: {
        '13': '3.25rem',
      },
      margin: {
        '7.5': '1.875rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '21': '5.25rem',
      },
      padding: {
        '7.5': '1.875rem',
        '9.5': '2.375rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '21': '5.25rem',
        '31': '125px',
      },
      gap: {
        '15': '3.75rem',
      },
      zIndex: {
        '1': '1',
        '2': '2',
      },
      backgroundImage: {
        'cover-typer': "url('/images/header-bg.jpg')",
        cover: "url('/images/header-bg.jpg')",
      },
      screens: {
        '2sm': { max: '639px' },
        xl: '1200px',
        '2xl': '1680px',
        laptop: '942px',
      },
      maxWidth: {
        '1.5xl': '1340px',
      },
      animation: {
        type: 'type 2.7s ease-out .8s infinite alternate both',
        cursor: 'cursor 0.6s linear infinite alternate',
        'mouse-dot': 'mouse-dot .6s ease-in-out infinite alternate',
      },
      keyframes: {
        'mouse-dot': {
          '0%': {
            bottom: 4,
            opacity: 1,
          },
          '40%': {
            bottom: '45%',
            opacity: 0,
          },
          '100%': {
            bottom: 4,
            opacity: 0,
          },
        },
        type: {
          '0%': { transform: 'translateX(0ch)' },
          '5%, 10%': { transform: 'translateX(1ch)' },
          '15%, 20%': { transform: 'translateX(2ch)' },
          '25%, 30%': { transform: 'translateX(3ch)' },
          '35%, 40%': { transform: 'translateX(4ch)' },
          '45%, 50%': { transform: 'translateX(5ch)' },
          '55%, 60%': { transform: 'translateX(6ch)' },
          '65%, 70%': { transform: 'translateX(7ch)' },
          '75%, 80%': { transform: 'translateX(8ch)' },
          '85%, 90%': { transform: 'translateX(9ch)' },
          '95%, 100%': { transform: 'translateX(11ch)' },
        },
        cursor: {
          '0%': { opacity: 1 },
          '40%': { opacity: 1 },
          '60%': { opacity: 0 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
