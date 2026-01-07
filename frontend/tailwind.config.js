/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent-magenta': '#FF3AF2',
                'accent-cyan': '#00F5D4',
                'accent-yellow': '#FFE600',
                'accent-orange': '#FF6B35',
                'accent-purple': '#7B2FFF',
                'bg-dark': '#0D0D1A',
                'bg-card': '#2D1B4E',
                'bg-card-alt': '#1A1A2E',
            },
            fontFamily: {
                'sans': ['DM Sans', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-reverse': 'float-reverse 5s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 4s ease infinite',
                'wiggle': 'wiggle 1s ease-in-out infinite',
                'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                'float-reverse': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '50%': { transform: 'translateY(20px) rotate(-5deg)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
