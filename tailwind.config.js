/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0A2540",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#00D084",
          foreground: "#0A2540",
        },
        secondary: {
          DEFAULT: "#1A3A5C",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1A3A5C",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#00D084",
          foreground: "#0A2540",
        },
        card: {
          DEFAULT: "#1A3A5C",
          foreground: "#FFFFFF",
        },
        border: "#2A4A6C",
        input: "#2A4A6C",
        ring: "#00D084",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'title': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};