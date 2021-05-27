module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: {
      primary: '#0E0C18',
      secondary: '#1B1925',
      neutral: '#fff',
      success: '#9582E1',
      danger: 'rgb(255, 245, 245)',
      successhover: '#5241A7'
    },
    border: {
      danger: 'rgb(245, 101, 101)'
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif']
    },
    textColor: {
      primary: '#262626',
      secondary: '#f2522e',
      neutral: '#fff',
      danger: '#bf452a',
      success: '#737373'
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem'
    },
    listStyleType: {
      disc: 'disc'
    },
    screens: {
      sm: { min: '360px', max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px', max: '1279px' },
      xl: { min: '1280px', max: '1535px' }
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
