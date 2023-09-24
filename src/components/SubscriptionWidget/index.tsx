import "../../styles/global.css";

import React, { StrictMode, useEffect } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { ISubscriptionWidget } from "../../interfaces/components/subscriptionWidget";
import {
	registerServices,
	validateJsonRpcUrlMap,
} from "../../services/startup";
import { defaultTheme, ThemeProvider } from "../../state/context/theme";
import store from "../../state/redux/store";
import Subscription from "../Subscription";

export function SubscriptionWidget({
	rpcUrlMap,
	lockConfig,
	theme,
	maxWidth,
}: ISubscriptionWidget) {
	const defaultPublicRpcUrls = {
		1: "https://rpc.ankr.com/eth",
		5: "https://rpc.ankr.com/eth_goerli",
		10: "https://mainnet.optimism.io",
		100: "https://rpc.ankr.com/gnosis",
		137: "https://rpc.ankr.com/polygon",
		42161: "https://arbitrum-one.gateway.pokt.network/v1/lb/93065b189ff5caf7783a8dbf",
		8453: "https://1rpc.io/base",
	};

	const customRpcUrls = { ...defaultPublicRpcUrls, ...rpcUrlMap };
	const customTheme = { ...defaultTheme, ...theme };

	useEffect(() => {
		validateJsonRpcUrlMap(customRpcUrls);
		registerServices();
	}, []);

	return (
		<StrictMode>
			<ReduxProvider store={store}>
				<ThemeProvider theme={customTheme}>
					<Subscription lockConfig={lockConfig} maxWidth={maxWidth} />
				</ThemeProvider>
			</ReduxProvider>
		</StrictMode>
	);
}
