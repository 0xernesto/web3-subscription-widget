import iconArbitrumOne from "../assets/images/iconArbitrumOne.svg";
import iconBase from "../assets/images/iconBase.png";
import iconEthereum from "../assets/images/iconEthereum.svg";
import iconGnosis from "../assets/images/iconGnosis.svg";
import iconOptimism from "../assets/images/iconOptimism.svg";
import iconPolygon from "../assets/images/iconPolygon.svg";
import { SupportedChain } from "../interfaces/data/chains";

export const chainData: SupportedChain[] = [
	// ********** Ethereum ********** //
	{
		name: "Ethereum",
		imageSource: iconEthereum,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://etherscan.io",
		chainId: 1,
	},
	// ********** Goerli ********** //
	{
		name: "Goerli",
		imageSource: iconEthereum,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://goerli.etherscan.io",
		chainId: 5,
	},
	// ********** Optimism ********** //
	{
		name: "Optimism",
		imageSource: iconOptimism,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://optimistic.etherscan.io",
		chainId: 10,
	},
	// ********** Gnosis ********** //
	{
		name: "Gnosis",
		imageSource: iconGnosis,
		nativeCurrency: {
			symbol: "XDAI",
			decimals: 18,
		},
		blockExplorer: "https://gnosisscan.io",
		chainId: 100,
	},
	// ********** Polygon ********** //
	{
		name: "Polygon",
		imageSource: iconPolygon,
		nativeCurrency: {
			symbol: "MATIC",
			decimals: 18,
		},
		blockExplorer: "https://polygonscan.com",
		chainId: 137,
	},
	// ********** Arbitrum One ********** //
	{
		name: "Arbitrum One",
		imageSource: iconArbitrumOne,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://arbiscan.io",
		chainId: 42161,
	},
	// ********** Base ********** //
	{
		name: "Base",
		imageSource: iconBase,
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://basescan.org",
		chainId: 8453,
	},
];
