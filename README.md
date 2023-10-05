# Subscription Widget for Unlock Protocol

![Static Badge](https://img.shields.io/badge/license-MIT-yellow)

## Overview

The [@0xernesto/web3-subscription-widget](https://www.npmjs.com/package/@0xernesto/web3-subscription-widget) is a React library to facilitate integration with [Unlock Protocol](https://unlock-protocol.com/) subscriptions.

This project was built during the 2023 ETHGlobal New York hackathon.

The [web3-sub-application](https://github.com/0xernesto/web3-sub-application) is a NextJS app that implements the `SubscriptionWidget` component of the `@0xernesto/web3-subscription-widget` library.

## Installation

Install the widgets library via `npm` or `yarn`.

```
npm i --save @0xernesto/web3-subscription-widget
```

or

```
yarn add @0xernesto/web3-subscription-widget
```

## Required Configuration

| Property     | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `rpcUrlMap`  | Mapping of EVM JSON-RPC endpoint URL strings, indexed by chain ID. |
| `lockConfig` | Object of properties corresponding to subscription "Lock".         |

## Optional Configuration

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `theme`    | Object of properties to set custom styling. |
| `maxWidth` | Number to define custom width, in pixels.   |

## Usage Example

This snippet demonstrates how to implement the `SubscriptionWidget` component in a React application.

**Note:** The minimum width of the widget is `300px`.

```jsx
import { SubscriptionWidget } from "@0xernesto/web3-subscription-widget";

const YourAppComponent = () => {
	// Must have length >= 1
	const rpcUrlMap = {
		5: process.env.PRIVATE_GOERLI_RPC,
	};

	const theme = {
		primaryColor: "#cc0202",
		goodColor: "#47A66F",
		badColor: "#CC4545",
		primaryTextColor: "#000000",
		secondaryTextColor: "#4A4A4A",
		buttonTextColor: "#FFFFFF",
		containerBackgroundColor: "#FEF7EA",
		containerOutlineColor: "#DDF087",
		dropdownBackgroundColor: "#FEF7EA",
		dropdownOutlineColor: "#000000",
		optionActiveColor: "#C9C9C9",
		fontFamily: "sans-serif",
	};

	const lockConfig = {
		iconUrl:
			"https://images.ctfassets.net/y2ske730sjqp/4aEQ1zAUZF5pLSDtfviWjb/ba04f8d5bd01428f6e3803cc6effaf30/Netflix_N.png",
		lockAddress: "0x33201c65f9e7faa6d17d16c218dbc0ddf51c91b7",
		lockNetwork: 5,
		lockName: "Netflix 30 Day Subscription",
	};

	return (
		<div>
			<SubscriptionWidget
				rpcUrlMap={rpcUrlMap}
				lockConfig={lockConfig}
				maxWidth={600} // pixels
				theme={theme}
			/>
		</div>
	);
};

export default YourAppComponent;
```

## Demo

Below are screenshots of a Next.js 13 app that uses the `SubscriptionWidget` component. Local testing of the widget can be done via [npm-link](https://docs.npmjs.com/cli/v9/commands/npm-link).

## ![app_example_disconnected](https://github.com/0xernesto/web3-subscription-widget/blob/main/demo/disconnectedWallet.png)

### <p align="center">Figure 1: `SubscriptionWidget` when wallet is disconnected.</p>

## ![app_example_disconnected](https://github.com/0xernesto/web3-subscription-widget/blob/main/demo/connectedWallet.png)

### <p align="center">Figure 2: `SubscriptionWidget` when wallet is connected.</p>

## Contributing

-   On a new branch, open a PR for a particular set of changes.
-   Name the PR according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   All commits must be related to the PR name and commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   To make the enforcement of these guidelines easier, husky, commitlint, commitizen, and GitHub Actions have been configured for this project.
-   All PRs must be squashed and merged to keep a clean history on the main branch.

**When commiting to GitHub, instead of using `git commit`, run the folowing command and follow the instrucitons.**

```sh
npm run commit
```

## Publishing

This project is set up to publish the package via GitHub Actions after a push or merge to the `main` branch. The following is an example step-by-step process for publishing new releases.

**NOTE:** `NPM_TOKEN` must be obtained from your npm account and added to the repo's GitHub Actions secrets. `WEB3_SUB_TOKEN` needs to be generated in your GitHub settings and added to the repo's GitHub Actions secrets. `GITHUB_TOKEN` is a special secret that is automatically created for the repo, so there is no need to explicitely define it anywhere.

Ensure that only the following scopes are checked when creating `WEB3_SUB_TOKEN`:

-   [x] repo
    -   [x] repo:status
    -   [x] repo_deployment
    -   [x] public_repo
    -   [x] repo:invite
    -   [x] security_events
-   [x] workflow
-   [x] write:packages
    -   [x] read:packages

1. On your local machine, create a new local branch - for example, `fix_for_the_bug`.

```sh
git checkout -b fix_for_the_bug
```

2. Make code changes and commit as necessary.

```sh
git add -A
```

```sh
npm run commit
```

Follow the commitizen prompts, and the final commit message should be something like `fix: "address part 1 of 5 of the bug"`

3. Push the branch to the remote GitHub repo.

```sh
git push origin fix_for_the_bug
```

4. Create a new pull request from the `fix_for_the_bug` branch, review the code, and address any changes necessary. Make sure the pull request name follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.

5. After the changes have been reviewed, the PR can be squashed and merged to the main branch. This will trigger the GitHub Action workflow that publishes the new release, based on the prefix used on the PR name.

The process above ensures that the code in the main branch always reflects that latest package version, and also keeps package versions consistent between npm and GitHub Packages.

## Semantic Versioning

The default values for these prefixes are defined in the [.releaserc.js](https://github.com/0xernesto/web3-subscription-widget/blob/main/.releaserc.js) file.

| Prefix     | Version Bump | Description                                                                                                                                                             |
| ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feat`     | Minor        | A new feature is introduced to the application (e.g., version bump from 1.0.0 to 1.1.0).                                                                                |
| `fix`      | Patch        | A bug fix in the codebase (e.g., version bump from 1.0.0 to 1.0.1).                                                                                                     |
| `docs`     | No bump      | Documentation only changes, no version bump.                                                                                                                            |
| `style`    | No bump      | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc), no version bump.                                                |
| `refactor` | No bump      | A code change that neither fixes a bug nor adds a feature, no version bump.                                                                                             |
| `perf`     | Patch        | A code change that improves performance (e.g., version bump from 1.0.0 to 1.0.1).                                                                                       |
| `test`     | No bump      | Adding missing tests or correcting existing tests, no version bump.                                                                                                     |
| `build`    | No bump      | Changes that affect the build system or external dependencies (e.g., gulp, broccoli, npm), no version bump.                                                             |
| `ci`       | No bump      | Changes to CI configuration files and scripts (e.g., Travis, Circle, BrowserStack, SauceLabs), no version bump.                                                         |
| `chore`    | No bump      | Other changes that don't modify src or test files, no version bump.                                                                                                     |
| `revert`   | Varied       | Reverts a previous commit, the bump depends on the reverted change (e.g., if a feature is reverted, a minor version bump down). The default bump for `revert` is Minor. |

## License

This project is released under the MIT License - see the [LICENSE.md](https://github.com/0xernesto/web3-subscription-widget/blob/main/LICENSE.md) file for details.
