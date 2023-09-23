/* eslint-disable @typescript-eslint/no-var-requires */
const external = require("rollup-plugin-peer-deps-external");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const image = require("@rollup/plugin-image");
const json = require("@rollup/plugin-json");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const dts = require("rollup-plugin-dts").default;
const babel = require("@rollup/plugin-babel");
const nodePolyfills = require("rollup-plugin-node-polyfills");
const packageJson = require("./package.json");

module.exports = [
	{
		input: "./src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
				inlineDynamicImports: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
				inlineDynamicImports: true,
			},
		],
		external: (id) =>
			["worker_threads"].includes(id) || id.includes("node_modules"),
		plugins: [
			external(),
			resolve(),
			commonjs(),
			image(),
			json(),
			nodePolyfills(),
			typescript({ tsconfig: "./tsconfig.json" }),
			babel({
				babelHelpers: "bundled",
				external: [".js", ".jsx", ".ts", ".tsx"],
				exclude: "node_modules/**",
			}),
			postcss({
				config: {
					path: "./postcss.config.js",
				},
				extensions: [".css"],
				minimize: true,
				inject: {
					insertAt: "top",
				},
			}),
		],
	},
	// types
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		external: [/\.css$/],
		plugins: [dts()],
	},
];
