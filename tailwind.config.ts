/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
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
		  "primary-muted": "hsl(var(--primary-muted))",
		  "destructive-muted": "hsl(var(--destructive-muted))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		fontFamily: {
		  sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
		},
		boxShadow: {
		  'card': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
		  'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
		  'elevated': '0 8px 24px 0 rgb(0 0 0 / 0.08), 0 4px 8px -4px rgb(0 0 0 / 0.04)',
		  'dialog': '0 20px 60px 0 rgb(0 0 0 / 0.12), 0 8px 16px -8px rgb(0 0 0 / 0.06)',
		},
		keyframes: {
		  "fade-in": {
			from: { opacity: 0 },
			to: { opacity: 1 },
		  },
		  "fade-in-up": {
			from: { opacity: 0, transform: "translateY(8px)" },
			to: { opacity: 1, transform: "translateY(0)" },
		  },
		  "fade-in-scale": {
			from: { opacity: 0, transform: "scale(0.96)" },
			to: { opacity: 1, transform: "scale(1)" },
		  },
		  "slide-in-right": {
			from: { opacity: 0, transform: "translateX(16px)" },
			to: { opacity: 1, transform: "translateX(0)" },
		  },
		  "shimmer": {
			"0%": { transform: "translateX(-100%)" },
			"100%": { transform: "translateX(100%)" },
		  },
		  "pulse-dot": {
			"0%, 80%, 100%": { transform: "scale(0)", opacity: 0.5 },
			"40%": { transform: "scale(1)", opacity: 1 },
		  },
		},
		animation: {
		  "fade-in": "fade-in 0.3s ease forwards",
		  "fade-in-up": "fade-in-up 0.35s ease forwards",
		  "fade-in-scale": "fade-in-scale 0.25s ease forwards",
		  "slide-in-right": "slide-in-right 0.3s ease forwards",
		  "shimmer": "shimmer 1.5s infinite",
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate")
	],
  };