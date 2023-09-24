## [1.0.2](https://github.com/0xernesto/web3-subscription-widget/compare/v1.0.1...v1.0.2) (2023-09-24)

### Bug Fixes

-   force patch ([f4e031c](https://github.com/0xernesto/web3-subscription-widget/commit/f4e031c8a9084a2a380717d9731b7f00a44dea38))

## [1.0.1](https://github.com/0xernesto/web3-subscription-widget/compare/v1.0.0...v1.0.1) (2023-09-24)

### Bug Fixes

-   force patch ([dad7f1a](https://github.com/0xernesto/web3-subscription-widget/commit/dad7f1ab445fdcffdaee21738ae94cb9449fb586))

# 1.0.0 (2023-09-24)

### Bug Fixes

-   move github actions files to workflows directory ([75c7f81](https://github.com/0xernesto/web3-subscription-widget/commit/75c7f81fd7ebac95564d49505ef17d469ce3d394))
-   specify files in package.json to remove extra files from package ([2b98b28](https://github.com/0xernesto/web3-subscription-widget/commit/2b98b285898905390186c3a9cc02a339a117bc14))

### Features

-   add initial subscription and and cancel functionality ([3714a69](https://github.com/0xernesto/web3-subscription-widget/commit/3714a6913b7c33147d9af3d80847b18a0904e032))

### BREAKING CHANGES

-   the "files" property was not specified in the package.json, which caused the entire
    project to be published, instead of just the dist/ directory.
