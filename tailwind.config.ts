const { withTV } = require('tailwind-variants/transformer');
const { default: flattenColorPalette, } = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'facebook-grey-btn': 'url(https://web.archive.org/web/20110414215758im_/http://static.ak.fbcdn.net/rsrc.php/v1/zD/r/B4K_BWwP7P5.png)'
      },
      boxShadow: {
        'facebook_bs': '0 1px 0 rgba(0, 0, 0, .1)',
      },
      colors: {
        'semitransparent': 'hsla(0, 0%, 0%, 0.75)',
        'transparent': 'hsla(0, 0%, 0%, 0)',
        'primary': 'hsl(0, 0%, 11%)',
        'background': 'hsl(240, 10%, 4%)',
        'card': '#0E0E0E',
        'card-light': 'hsl(0, 0%, 7%)',
        'border': 'hsl(60, 2%, 10%)',
        'accent-blue': 'hsl(215, 93%, 58%)',
      },
      borderWidth: {
        '1': '1px' 
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'IBM_PLEX_MONO': ['var(--font-ibm_plex_mono)'],
      'facebook_link': ['"lucida grande",tahoma,verdana,arial,sans-serif'],
    },
  },
  plugins: [
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            facebook_blue: '#3b5998'
          }
        }
      },
      themes: [
        {
          name: 'facebookTheme',

          extend: {
            colors: {
              facebook_blue: '#3b5998',
              ddd: '#ddd',
            }
          }
        }
      ]
    }),
    addVariablesForColors,
  ],
}

function addVariablesForColors({ addBase, theme }: { addBase: any, theme: any }) {

  let allColors = flattenColorPalette(theme('colors'));

  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });

};
