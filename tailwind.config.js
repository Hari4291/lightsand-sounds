/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#07090e',
          900: '#0a0d14',
          850: '#0e121a',
          800: '#121722',
          700: '#1a2232',
        },
        charcoal: {
          900: '#11141a',
          800: '#181d26',
          700: '#222936',
        },
        gold: {
          50: '#fdfbf4',
          100: '#f9f4e2',
          200: '#f2e6bd',
          300: '#e8d28e',
          400: '#dfb753',
          500: '#d4af37', // primary gold accent
          600: '#b89028',
          700: '#946f20',
          800: '#795820',
          900: '#674a20',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f7df94 0%, #d4af37 50%, #99731e 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)',
        'hero-radial': 'radial-gradient(circle at 75% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(180deg, rgba(22, 28, 40, 0.7) 0%, rgba(14, 18, 26, 0.9) 100%)',
      },
      boxShadow: {
        'gold-subtle': '0 0 25px -5px rgba(212, 175, 55, 0.2)',
        'gold-glow': '0 0 40px -5px rgba(212, 175, 55, 0.35)',
        'card-elevation': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
}

