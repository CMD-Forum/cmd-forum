import type { Config } from 'tailwindcss'

const config: Config = {
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
        'semitransparent': 'rgba(0, 0, 0, 0.75)',
        'accent_blue': '#1a9fff',
        'primary': '#1c1c1c',
        'background': '#0f0f0f',
        'card': '#0F0F0F',
        'card-light': '#131313',
        'border': '#1b1d1e',
        'notification': '#ff453a',
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'facebook_link': ['"lucida grande",tahoma,verdana,arial,sans-serif'],
    }
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
    })
  ],
}
export default config
