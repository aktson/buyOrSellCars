const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: "#009688",
                    medium: "#26a69a",
                    dark: "#00897b",
                },
                secondary: {
                    light: "#ffab91",
                    medium: "#ff8a65",
                    dark: "#f4511e",
                },
                dark: "#455a64",
                light: "#eceff1",



            }
        },

    },
    plugins: [],
});