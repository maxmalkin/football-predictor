/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#0B2A4A",
				"accent-red": "#D24726",
				"accent-orange": "#F5A623",
				"accent-yellow": "#F8CD65",
				background: "#F3F4F6",
				card: "#FFFFFF",
				muted: "#E5E7EB", // Light gray for borders
			},
		},
	},
	plugins: [],
};
