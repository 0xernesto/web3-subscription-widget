module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		screens: {
			xxs: "300px",
			xs: "365px",
			sm: "440px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				"red-accent": "#CC4545",
				"green-accent": "#47a66f",
			},
		},
	},
	plugins: [],
};
