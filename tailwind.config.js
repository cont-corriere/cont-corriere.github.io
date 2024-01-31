/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				// 'light-orange': '#FFA500',
				"light-orange": "#ffa500",
				"dark-orange": "#FF7C00",
				"light-grey": "#EFEFEF",
				"dark-grey": "#E1E1E1E1",
			},
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				"lato-bold": ["Lato-bold", "sans-serif"],
				// sans: ["Lato"],
			},
		},
	},
	plugins: [],
};
