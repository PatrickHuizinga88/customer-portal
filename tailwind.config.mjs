import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "3rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      screens: {
        "2xl": "1400px",
      },
      fontFamily: {
        headings: ['var(--font-headings)', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dark: "color-mix(in srgb, hsl(var(--primary)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "color-mix(in srgb, hsl(var(--primary)) 20%, hsl(var(--background)))",
          dark: "color-mix(in srgb, hsl(var(--primary)) 30%, hsl(var(--background)))",
          foreground: "hsl(var(--foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dark: "color-mix(in srgb, hsl(var(--accent)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          dark: "color-mix(in srgb, hsl(var(--info)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--info-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          dark: "color-mix(in srgb, hsl(var(--success)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          dark: "color-mix(in srgb, hsl(var(--warning)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          dark: "color-mix(in srgb, hsl(var(--destructive)) 80%, hsl(var(--foreground)))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        DEFAULT: "calc(var(--radius) * 0.5)",
        '3xl': "calc(var(--radius) * 2)",
        '2xl': "calc(var(--radius) * 1.5)",
        xl: "calc(var(--radius) * 1.25)",
        lg: "var(--radius)",
        md: "calc(var(--radius) * 0.75)",
        sm: "calc(var(--radius) * 0.25)",
        button: "var(--radius-button)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--reka-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--reka-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--reka-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--reka-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [animate],
}