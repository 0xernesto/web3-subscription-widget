export interface ICancelButton {
	action: () => Promise<void>;
	lockAddress: `0x${string}`;
	isLoading: boolean;
	nativeBalance: bigint;
	errorMessage: string;
}
