module.exports = {
	branches: "main",
	plugins: [
		[
			"@semantic-release/commit-analyzer",
			{
				preset: "angular",
				releaseRules: [
					{ type: "feat", release: "minor" },
					{ type: "fix", release: "patch" },
					{ type: "docs", release: false },
					{ type: "style", release: false },
					{ type: "refactor", release: false },
					{ type: "perf", release: "patch" },
					{ type: "test", release: false },
					{ type: "build", release: false },
					{ type: "ci", release: false },
					{ type: "chore", release: false },
					{ type: "revert", release: "minor" },
				],
			},
		],
		"@semantic-release/release-notes-generator",
		"@semantic-release/changelog",
		"@semantic-release/npm",
		[
			"@semantic-release/git",
			{
				message: "chore(release): ${nextRelease.version} [skip ci]",
			},
		],
		"@semantic-release/github",
	],
};
