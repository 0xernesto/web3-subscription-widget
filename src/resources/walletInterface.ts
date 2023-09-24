import {
	Chain,
	Config,
	configureChains,
	connect,
	createConfig,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	PublicClient,
	readContract,
	switchNetwork,
	waitForTransaction,
	watchAccount,
	watchNetwork,
	WebSocketPublicClient,
	writeContract,
} from "@wagmi/core";
import {
	arbitrum,
	base,
	gnosis,
	goerli,
	mainnet,
	optimism,
	polygon,
} from "@wagmi/core/chains";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { LedgerConnector } from "@wagmi/core/connectors/ledger";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import { SafeConnector } from "@wagmi/core/connectors/safe";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { publicProvider } from "@wagmi/core/providers/public";

import { RpcUrlMap } from "../interfaces/components/subscriptionWidget";
import { FallbackTransport } from "./blockchainInterface";

// eslint-disable-next-line import/no-mutable-exports
let walletConfig: Config<
	PublicClient<FallbackTransport>,
	WebSocketPublicClient
>;

export const initializeWalletConfig = (rpcUrlMap: RpcUrlMap) => {
	const { chains, publicClient } = configureChains(
		[mainnet, goerli, optimism, gnosis, polygon, arbitrum, base],
		[
			jsonRpcProvider({
				rpc: (chain: Chain) => ({
					http: rpcUrlMap[chain.id],
				}),
			}),
			publicProvider(),
		]
	);

	const connectors = [
		new InjectedConnector({ chains }),
		new MetaMaskConnector({ chains }),
		new WalletConnectConnector({
			options: { projectId: "a1128eb8f6f9e8f77f432c0158b8b141" },
		}),
		new CoinbaseWalletConnector({
			options: {
				appName: "Web3 Subscription Widget",
				appLogoUrl:
					"https://avatars.githubusercontent.com/u/36645693?s=200&v=4",
			},
		}),
		new LedgerConnector({
			options: { projectId: "a1128eb8f6f9e8f77f432c0158b8b141" },
		}),
		new SafeConnector({
			chains,
			options: {
				allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
				debug: false,
			},
		}),
	];

	walletConfig = createConfig({
		autoConnect: false,
		connectors,
		publicClient,
	});
};

export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
};
