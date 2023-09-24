/* eslint-disable import/no-mutable-exports */
import { ISubscriptionService } from "../interfaces/services/subscription";
import { ITokenService } from "../interfaces/services/token";
import { IWalletService } from "../interfaces/services/wallet";

// **************** Default Registry Values **************** //
export let walletService: IWalletService | null = null;
export let tokenService: ITokenService | null = null;
export let subscriptionService: ISubscriptionService | null = null;
// ********************************************************* //

// *************** Registration Function *************** //
export const registerWalletService = (service: IWalletService) => {
	walletService = service;
};
export const registerTokenService = (service: ITokenService) => {
	tokenService = service;
};
export const registerSubscriptionService = (service: ISubscriptionService) => {
	subscriptionService = service;
};
// ***************************************************** //

// *************** Retrieval Function ****************** //
export const getWalletService = (): IWalletService => {
	if (!walletService) {
		throw new Error("Wallet service not registered.");
	}
	return walletService;
};
export const getTokenService = (): ITokenService => {
	if (!tokenService) {
		throw new Error("Token service not registered.");
	}
	return tokenService;
};
export const getSubscriptionService = (): ISubscriptionService => {
	if (!subscriptionService) {
		throw new Error("Subscription service not registered.");
	}
	return subscriptionService;
};
// ***************************************************** //
