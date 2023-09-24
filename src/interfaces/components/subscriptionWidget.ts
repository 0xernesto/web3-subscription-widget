import { Theme } from "../state/theme";

export type RpcUrlMap = Record<number, string>;

export type LockConfig = {
	iconUrl: string;
	lockAddress: `0x${string}`;
	lockNetwork: number;
	lockName: string;
	paymentCurrency: `0x${string}`;
};

export type ISubscriptionWidget = {
	rpcUrlMap: RpcUrlMap; // required
	lockConfig: LockConfig; // required
	theme?: Theme;
	maxWidth?: number;
};
