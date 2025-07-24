/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary-black': '#0A0A0B',
        'premium-gray': '#1C1C1E',
        'soft-gray': '#F2F2F7',
        'pure-white': '#FFFFFF',
        
        // Support Colors
        'accent-gold': '#D4AF37',
        'success-green': '#30D158',
        'warning-amber': '#FF9F0A',
        'error-red': '#FF3B30',
        
        // Semantic Colors
        'text-primary': '#000000',
        'text-secondary': '#3C3C43',
        'text-tertiary': '#8E8E93',
        'border-light': '#E5E5EA',
        'background-elevated': '#FFFFFF',
      },
      fontFamily: {
        'inter': ['Inter Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-large': ['72px', { lineHeight: '80px', fontWeight: '200' }],
        'display-medium': ['48px', { lineHeight: '56px', fontWeight: '200' }],
        'headline-large': ['32px', { lineHeight: '40px', fontWeight: '300' }],
        'headline-medium': ['24px', { lineHeight: '32px', fontWeight: '400' }],
        'body-large': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-medium': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'button': ['16px', { lineHeight: '24px', fontWeight: '500' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        'premium': '16px',
        'card': '12px',
        'input': '8px',
      },
      boxShadow: {
        'card': '0 2px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.08)',
        'modal': '0 20px 60px rgba(0,0,0,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      screens: {
        'mobile': { 'max': '767px' },
        'tablet': { 'min': '768px', 'max': '1023px' },
        'desktop': { 'min': '1024px' },
        'large-desktop': { 'min': '1440px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}