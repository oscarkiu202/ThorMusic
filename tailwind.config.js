export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 32px 84px rgba(29, 185, 84, 0.18)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top right, rgba(29, 185, 84, 0.22), transparent 28%), radial-gradient(circle at bottom left, rgba(96, 165, 250, 0.16), transparent 22%)',
      },
      colors: {
        thor: {
          bg: '#05060d',
          surface: '#11151f',
          card: '#121827',
          accent: '#1db954',
          accentBright: '#1ff575',
          text: '#f4f7fe',
          muted: '#9ca3af',
          border: 'rgba(255, 255, 255, 0.08)',
          gold: '#f4c149',
        },
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.82', transform: 'translateY(-1px)' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.01)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 2.4s ease-in-out infinite',
        pulseSlow: 'pulseSlow 4.5s ease-in-out infinite',
        slideUp: 'slideUp 0.45s ease-out both',
        fadeIn: 'fadeIn 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
