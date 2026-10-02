/**
 * Tailwind CSS Configuration
 *
 * Theme Palette:
 * - Charcoal Black: #222222 (Foundational dark surface & high-contrast typography)
 * - Deep Teal: #2F6F6D (Primary Accent: buttons, active links, progress bars, interactive CTAs)
 * - Warm Beige: #E6D8C5 (Secondary Surface: borders, subtle card backdrops, chip backgrounds)
 * - Muted Copper: #B66A4A (Secondary Accent: scarce, high-impact highlights, stars, medals, rank markers)
 * - Off White: #F7F4EF (Foundational light canvas, card background, high-contrast dark text)
 */

const deepTealScale = {
  50: '#F0F6F6',
  100: '#DDECEB',
  200: '#BCD8D7',
  300: '#7CB5B3',
  400: '#4EA09D',
  500: '#3D8280',
  600: '#2F6F6D', // Primary Deep Teal
  700: '#265B59', // Darker Deep Teal (hover state)
  800: '#1D4544',
  900: '#132F2E',
  950: '#0B1B1A',
};

const copperScale = {
  50: '#FAF4F1',
  100: '#F4E7E1',
  200: '#E7CEC2',
  300: '#D7AE9C',
  400: '#C78B72',
  500: '#B66A4A', // Muted Copper Accent
  600: '#A45B3C', // Hover / Darker Copper
  700: '#854930',
  800: '#663825',
  900: '#48271A',
};

const warmBeigeScale = {
  50: '#FBF9F6',
  100: '#F1E9DE',
  200: '#E6D8C5', // Warm Beige Foundation
  300: '#D5C2AA',
  400: '#BAA184',
  500: '#9B8164',
  600: '#7B644D',
  700: '#5C4A39',
  800: '#3D3126',
  900: '#201913',
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
        charcoal: '#222222',
        teal: deepTealScale,
        beige: warmBeigeScale,
        copper: copperScale,
        offwhite: '#F7F4EF',

        primary: {
          DEFAULT: '#2F6F6D',
          hover: '#265B59',
          light: '#EBF3F3',
          dark: '#1D4544',
        },

        // Surface & Typography scale tuned to Off White, Warm Beige & Charcoal Black
        slate: {
          50: '#F7F4EF',  // Canvas light background (Off White)
          100: '#F1E9DE', // Card & alternating light section background (Warm Beige subtle)
          200: '#E6D8C5', // Light borders & dividers (Warm Beige)
          300: '#D8C7B1',
          400: '#AFA08D',
          500: '#7D7162',
          600: '#574E43', // Secondary body copy in light mode
          700: '#33312E', // Dark mode borders & dividers
          800: '#222222', // Primary Charcoal Black
          900: '#181818', // Main dark mode background
          950: '#111111',
        },

        gray: {
          50: '#FAF7F2',
          100: '#F1E9DE',
          200: '#E6D8C5',
          300: '#D8C7B1',
          400: '#AFA08D',
          500: '#7D7162',
          600: '#4E4841', // Body copy in light mode
          700: '#2E2B27',
          800: '#222222', // Charcoal Black
          900: '#161616',
        },

        // Primary interactive accent mapped to Deep Teal (#2F6F6D)
        blue: deepTealScale,

        // Accent scale mapped to Muted Copper (#B66A4A) for icons/details
        amber: copperScale,
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
