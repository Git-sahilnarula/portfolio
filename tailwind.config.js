/**
 * Tailwind CSS Configuration
 *
 * Theme: Deep Teal (#0D5C63) & Dark Charcoal (#222222) on Soft Beige/Cream (#f5f2eb)
 * - Light Mode: Soft beige/cream background (#f5f2eb) with deep teal accents (#0D5C63) and dark charcoal text (#222222).
 * - Dark Mode: Dark charcoal surfaces (#181818 / #222222) with luminous teal accents (#2DD4BF / #5EEAD4).
 */

const deepTealScale = {
  50: '#F0F7F7',
  100: '#E0EFF0',
  200: '#C1DFE2',
  300: '#92C6CC',
  400: '#5FA6AF',
  500: '#33858F',
  600: '#0D5C63', // Primary Deep Teal
  700: '#0A484E', // Darker Deep Teal (hover state)
  800: '#073539',
  900: '#042124',
};

const stoneAccentScale = {
  50: '#f5f2eb',
  100: '#ebe6dc',
  200: '#dcd5c7',
  300: '#c4baa7',
  400: '#a39782',
  500: '#55524d',
  600: '#33312e',
  700: '#222222',
  800: '#1a1a1a',
  900: '#121212',
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#0D5C63',     // Deep Teal
        charcoal: '#222222',    // Dark Charcoal
        cream: '#f5f2eb',       // Soft Beige / Cream
        teal: deepTealScale,

        // Surface & Typography scale
        slate: {
          50: '#f5f2eb',  // Main light background
          100: '#ece7dd', // Card & alternating light section background
          200: '#ded7c9', // Light borders & dividers
          300: '#c8bfb0',
          400: '#9e9587',
          500: '#6e685f',
          600: '#4a4640',
          700: '#333333', // Dark mode borders
          800: '#222222', // Primary Dark Charcoal
          900: '#181818', // Main dark mode background
          950: '#111111',
        },

        gray: {
          50: '#faf8f3',
          100: '#ece7dd',
          200: '#ded7c9',
          300: '#cfc7b8',
          400: '#9e9587',
          500: '#6e685f',
          600: '#45423d', // Body copy in light mode
          700: '#2e2e2e',
          800: '#222222',
          900: '#161616',
        },

        // Primary interactive accent mapped to Deep Teal (#0D5C63)
        blue: {
          50: '#F0F7F7',
          100: '#E0EFF0',
          200: '#C1DFE2',
          300: '#5EEAD4', // Luminous teal in dark mode
          400: '#2DD4BF', // Vibrant teal accent in dark mode
          500: '#33858F',
          600: '#0D5C63', // Primary Deep Teal for buttons, links & badges
          700: '#0A484E', // Deep Teal button hover state
          800: '#073539',
          900: '#042124',
        },

        emerald: stoneAccentScale,
        green: stoneAccentScale,
        purple: stoneAccentScale,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
