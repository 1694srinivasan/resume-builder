// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                print: { raw: 'print' }, // Enables print:hidden and print:block utilities
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;