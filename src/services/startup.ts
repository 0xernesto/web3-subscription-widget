import { RpcUrlMap } from "../interfaces/components/subscriptionWidget";
import {
	initializeWalletConfig,
	registerSubscriptionService,
	registerTokenService,
	registerWalletService,
} from "../resources";
import { checkJsonRpcUrlMapLength } from "../utils/checkJsonRpcUrlMapLength";
import SubscriptionService from "./subscription";
import TokenService from "./token";
import WalletService from "./wallet";

export const validateJsonRpcUrlMap = (rpcUrlMap: RpcUrlMap) => {
	try {
		checkJsonRpcUrlMapLength(rpcUrlMap);

		// If no error is thrown, initialize wallet config and dispatch global state update action
		initializeWalletConfig(rpcUrlMap);
	} catch (error) {
		if (error instanceof Error) {
			// eslint-disable-next-line no-console
			console.error(error.message);
		} else {
			// eslint-disable-next-line no-console
			console.error("An unexpected error occurred: ", error);
		}
	}
};
export const registerServices = () => {
	registerWalletService(WalletService.getInstance());
	registerTokenService(TokenService.getInstance());
	registerSubscriptionService(SubscriptionService.getInstance());
};
