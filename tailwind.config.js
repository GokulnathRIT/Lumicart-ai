/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#818cf8',
                secondary: '#22d3ee',
                accent: '#f472b6',
            },
            fontFamily: {
                suit: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
