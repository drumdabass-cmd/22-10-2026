const extra = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          light: '#dfc28f',
          DEFAULT: '#c5a059',
          dark: '#9a7532',
        },
        noir: {
          900: '#070707',
          800: '#0f0f10',
          700: '#171719',
          600: '#222226',
        }
      }
    }
  }
};

module.exports = { content: ["./index.html", "./src/**/*.{js,jsx}"], ...extra };
