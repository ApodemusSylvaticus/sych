module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('@tailwindcss/deprecation-warnings'),
        require('autoprefixer'),
    ],
};
