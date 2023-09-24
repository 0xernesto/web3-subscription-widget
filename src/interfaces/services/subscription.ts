export abstract class ISubscriptionService {
	abstract subscribe(
		lockAddress: `0x${string}`,
		subPrice: bigint,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		setIsLoading: (value: boolean) => void
	): Promise<void>;

	abstract getPaymentTokenAddress(): Promise<`0x${string}`>;

	abstract getSubscriptionPrice(lockAddress: `0x${string}`): Promise<bigint>;

	abstract checkSubscription(lockAddress: `0x${string}`): Promise<bigint>;

	abstract getTokenId(lockAddress: `0x${string}`): Promise<bigint>;

	abstract getRefundAmount(
		lockAddress: `0x${string}`,
		tokenId: bigint
	): Promise<bigint>;

	abstract cancelSubscription(
		lockAddress: `0x${string}`,
		tokenId: bigint,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		setIsLoading: (value: boolean) => void
	): Promise<void>;
}
