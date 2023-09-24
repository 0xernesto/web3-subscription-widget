export interface ISubscribeButton {
	action: () => Promise<void>;
	lockAddress: `0x${string}`;
	isLoading: boolean;
	nativeBalance: bigint;
	errorMessage: string;
}
