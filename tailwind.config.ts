module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        fontFamily: {
            display: ['ui-sans-serif'],
            sans: [
                'neue-haas-unica',
            ],
        },
        extend: {
            keyframes: {
                bounce: {
                    '0%, 100%': { transform: 'translateY(0%)' },
                    '50%': { transform: 'translateY(-15%)' },
                },
            },
            maxWidth: {
                '8xl': '1800px',
            },

        },
    },
    plugins: [],
};
