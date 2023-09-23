module.exports = {
	endOfLine: "lf",
	quoteProps: "as-needed",
	trailingComma: "es5",
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	singleQuote: false,
	jsxSingleQuote: false,
	printWidth: 80,
	tabWidth: 4,
	semi: true,
	useTabs: true,
	htmlWhitespaceSensitivity: "css",
	tailwindConfig: "./tailwind.config.js",
	plugins: [
		"prettier-plugin-tailwindcss", // MUST come last
	],
	overrides: [
		{
			files: "*.yml",
			options: {
				singleQuote: false,
				tabWidth: 2,
			},
		},
	],
};
