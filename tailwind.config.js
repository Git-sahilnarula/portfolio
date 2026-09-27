/**
 * Tailwind CSS Configuration
 *
 * Theme: Dark Charcoal (#222222) on Soft Beige / Cream (#f5f2eb)
 * - Light Mode: Soft beige/cream background (#f5f2eb) with dark charcoal typography & buttons (#222222).
 * - Dark Mode: Dark charcoal surfaces (#181818 / #222222) with soft beige/cream typography (#f5f2eb).
 */

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
        primary: '#222222',
        secondary: '#f5f2eb',
        cream: '#f5f2eb',
        charcoal: '#222222',

        // Surface & Typography scale (#f5f2eb Soft Beige/Cream <-> #222222 Dark Charcoal)
        slate: {
          50: '#f5f2eb',  // Main light background (Soft Beige/Cream)
          100: '#ece7dd', // Secondary light section background
          200: '#ded7c9', // Light borders & dividers
          300: '#c8bfb0',
          400: '#9e9587',
          500: '#6e685f',
          600: '#4a4640',
          700: '#333333', // Dark mode borders & elevated elements
          800: '#222222', // Main primary text (Light) & Card surface (Dark)
          900: '#181818', // Main dark mode background
          950: '#111111', // Deepest footer background
        },

        gray: {
          50: '#faf8f3',
          100: '#ece7dd', // Alternating section background in light mode
          200: '#ded7c9',
          300: '#cfc7b8',
          400: '#9e9587',
          500: '#6e685f',
          600: '#45423d', // Body copy in light mode
          700: '#2e2e2e',
          800: '#222222', // Primary Dark Charcoal
          900: '#161616',
        },

        // Primary interactive accent mapped to Dark Charcoal (#222222) & Warm Cream
        blue: {
          50: '#f5f2eb',
          100: '#ebe6dc',
          200: '#dcd5c7',
          300: '#e6dfd3', // High-contrast cream accent in dark mode
          400: '#d5ccb8', // Hover/heading accent in dark mode
          500: '#3a3a3a',
          600: '#222222', // Primary buttons, active links & underlines (#222222)
          700: '#111111', // Button hover state
          800: '#222222',
          900: '#2c2a27',
        },

        // Secondary & Tertiary accents harmonized with Charcoal & Cream
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
