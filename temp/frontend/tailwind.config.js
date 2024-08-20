/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './mods/web/www/**/*.{js,html}',
        './www/**/*.{js,html}',
    ],
    theme: {
        goldenRatio:{},
    },
    plugins: [
        require('tailwindcss-golden-ratio'),
    ],
}
