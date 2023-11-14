/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
    maxWidth: {
      base: '1440px'
    },
    colors: {
      blue_light: '#b9e2fc',
      blue: '#51bafc',
      blue_lights: '#3b5998',
      black: '#24262b',
      white: '#ffffff',
      grey_light: '#edeaeb',
      grey_dark: '#515151',
      light: '#000000',
      red: '#ed4f10',
      green: '#24e527',
      base: '#fef5ef',
      yellow: '#e9b102',
      yellow_hover: '#ecb719',
      orange: '#f79837',
      transparent: 'transparent',
      body: '#25074d'
    },
    backgroundPosition: {
      inhertstatic: 'top left',
      center: 'center'
    },
    keyframes: {
      fadeInOut: {
        '0%': {
          transform: 'translateY(-80px)'
        },
        // '50%': {
        //   transform: 'translateY(-40px)'
        // },
        '100%': {
          transform: 'translateY(0)'
        }
      },
      slideTop: {
        '0%': {
          transform: 'translateY(-100%)'
        },
        // '50%': {
        //   transform: 'translateY(-40px)'
        // },
        '100%': {
          transform: 'translateY(0%)'
        }
      },
      slideBottom: {
        '0%': {
          transform: 'translateY(100%)'
        },
        // '50%': {
        //   transform: 'translateY(-40px)'
        // },
        '100%': {
          transform: 'translateY(0%)'
        }
      },
      slideInRight: {
        '0%': {
          transform: 'translateX(100%)'
        },
        '100%': {
          transform: 'translateX(0%)'
        }
      },
      slideInLeft: {
        '0%': {
          transform: 'translateX(-100%)'
        },
        '100%': {
          transform: 'translateX(0%)'
        }
      },
      slideOutLeft: {
        '0%': {
          transform: 'translateX(0%)'
        },
        '100%': {
          transform: 'translateX(-100%)'
        }
      },
      flipIn: {
        '0%': {
          transform: 'perspective(400px) rotateX(90deg)',
          opacity: 0
        },
        '40%': {
          transform: 'perspective(400px) rotateX(-20deg)'
          // opacity: 0.5

        },
        '60%': {
          transform: 'perspective(400px) rotateX(10deg)',
          opacity: '1'
        },
        '80%': {
          transform: 'perspective(400px) rotateX(-5deg)'
        },
        '100%': {
          transform: 'perspective(400px)'
        }
      },
      flipInMenu: {
        '0%': {
          transform: 'perspective(400px) rotateX(90deg)',
          opacity: 0
        },
        '40%': {
          transform: 'perspective(400px) rotateX(60deg)'
          // opacity: 0.5

        },
        '60%': {
          transform: 'perspective(400px) rotateX(30deg)',
          opacity: '1'
        },
        '80%': {
          transform: 'perspective(400px) rotateX(1deg)'
        },
        '100%': {
          transform: 'perspective(400px)'
        }
      }
    },
    backgroundSize: {
      logopc: '220px',
      logomobile: '140px'
    }
  },
  plugins: []
}
