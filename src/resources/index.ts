import {
	EIP1193Provider,
	formatUnits,
	isAddress,
	parseUnits,
	WalletClient,
	zeroAddress,
} from "./blockchainInterface";
import { getChain } from "./getChain";
import {
	getSubscriptionService,
	getTokenService,
	getWalletService,
	registerSubscriptionService,
	registerTokenService,
	registerWalletService,
} from "./serviceRegistry";
import {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	initializeWalletConfig,
	readContract,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
} from "./walletInterface";

export type { EIP1193Provider, WalletClient };

export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	formatUnits,
	getChain,
	getSubscriptionService,
	getTokenService,
	getWalletClient,
	getWalletService,
	initializeWalletConfig,
	isAddress,
	parseUnits,
	readContract,
	registerSubscriptionService,
	registerTokenService,
	registerWalletService,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
	zeroAddress,
};
