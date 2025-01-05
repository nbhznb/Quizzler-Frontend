/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'powder': '#F9FAF8',
        'primary': '#60a3d9',
        'primary-focus': '#0074b7',
        'navy-blue': '#003b73',
        'neutral': '#3d5a80',
        'danger': '#950606',
        'danger-hover': '#740404',
        'success': '#50C878',
      },
      height: {
        'navbar': '60px'
      },
      spacing: {
        'navbar': '60px',
      },
      fontSize: {
        'menu': '1.4em',
        'xs': '0.65rem',      // 10.4px
        'sm': '0.75rem',      // 12px
        'base': '0.875rem',   // 14px
        'lg': '1rem',         // 16px
        'xl': '1.125rem',     // 18px
        '2xl': '1.25rem',     // 20px
      },
      boxShadow: {
        'navbar': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms')({
      strategy: 'class',
    })
  ],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#60A3D9",
        "primary-focus": "#0074B7",
        "primary-content": "#F9FAF8",
        "secondary": "#003B73",
        "accent": "#BFD7ED",
        "neutral": "#3d5a80",
        "base-100": "#F9FAF8",
      },
    }],
    darkTheme: false,
  },
}
