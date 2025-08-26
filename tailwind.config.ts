import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom color palette
                theme: {
                    primary: "#000000", // Black
                    secondary: "#ef4444", // Red-500
                    accent: "#dc2626", // Red-600
                    dark: "#991b1b", // Red-800
                    darker: "#7f1d1d", // Red-900
                    text: "#ffffff", // White
                    "text-secondary": "#ffffff92", // White with opacity
                    "text-muted": "#d1d5db", // Gray-300
                    // Medal colors for rankings
                    gold: "#ffd700", // Gold
                    silver: "#c0c0c0", // Silver
                    bronze: "#cd7f32", // Bronze
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};

export default config;
