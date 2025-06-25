import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Pokemon-specific colors
        pokemon: {
          electric: "#f7d02c",
          fire: "#ee8130",
          water: "#6390f0",
          grass: "#7ac74c",
          normal: "#a8a878",
          fighting: "#c22e28",
          flying: "#a98ff3",
          poison: "#a33ea1",
          ground: "#e2bf65",
          rock: "#b6a136",
          bug: "#a6b91a",
          ghost: "#735797",
          steel: "#b7b7ce",
          psychic: "#f95587",
          ice: "#96d9d6",
          dragon: "#6f35fc",
          dark: "#705746",
          fairy: "#d685ad",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pokemon-bounce": {
          "0%, 100%": {
            transform: "translateY(-2px)",
          },
          "50%": {
            transform: "translateY(2px)",
          },
        },
        "pokeball-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "slide-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pokemon-bounce": "pokemon-bounce 2s ease-in-out infinite",
        "pokeball-spin": "pokeball-spin 1s linear infinite",
        "slide-in": "slide-in 0.3s ease-out",
      },
      backgroundImage: {
        "pokemon-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "electric-gradient":
          "linear-gradient(135deg, #f7d02c 0%, #f39c12 100%)",
        "water-gradient": "linear-gradient(135deg, #6390f0 0%, #3498db 100%)",
        "grass-gradient": "linear-gradient(135deg, #7ac74c 0%, #27ae60 100%)",
        "fire-gradient": "linear-gradient(135deg, #ee8130 0%, #e74c3c 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
