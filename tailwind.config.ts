import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    950: "#050505", // Deepest Obsidian
                    900: "#0a0a0a",
                    800: "#1A1612", // Metallic Bronze
                },
                gold: {
                    400: "#E6C768",
                    500: "#D4AF37", // Nocturnal Gold
                    600: "#B4942B",
                },
                emerald: {
                    500: "#10b981",
                },
                rose: {
                    500: "#f43f5e",
                },
                amber: {
                    500: "#f59e0b",
                },
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-montserrat)", "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
