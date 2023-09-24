/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import publickLockAbi from "../abis/publicLock.json";
import { ISubscriptionService } from "../interfaces/services/subscription";
import {
	readContract,
	waitForTransaction,
	writeContract,
	zeroAddress,
} from "../resources";
import store from "../state/redux/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class SubscriptionService extends ISubscriptionService {
	private static instance: SubscriptionService;

	private constructor() {
		super();
	}

	public static getInstance(): SubscriptionService {
		if (!SubscriptionService.instance) {
			SubscriptionService.instance = new SubscriptionService();
		}
		return SubscriptionService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async subscribe(
		lockAddress: `0x${string}`,
		subPrice: bigint,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		setIsLoading: (value: boolean) => void
	): Promise<void> {
		setIsLoading(true);

		const userAddress = store.getState().wallet.address;

		try {
			const { hash } = await writeContract({
				address: lockAddress,
				abi: publickLockAbi,
				functionName: "purchase",
				args: [
					[subPrice],
					[userAddress],
					[userAddress],
					[zeroAddress],
					["0x"],
				],
				value: subPrice,
			});

			// Wait for transaction to successfully complete
			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				setSuccessMessage("You're subscribed!");
			} else {
				setErrorMessage("Something went wrong trying to subscribe.");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.message.includes("rejected")) {
				// Do nothing
			} else {
				let errorMessage;

				if (error.data && error.data.message) {
					errorMessage = error.data.message;
				} else if (
					error.error &&
					error.error.data &&
					error.error.data.message
				) {
					errorMessage = error.error.data.message;
				} else {
					errorMessage = error.toString();
				}

				setErrorMessage(
					`Something went wrong trying to subscribe. \n${errorMessage}`
				);
			}
		}
		setIsLoading(false);
	}

	public async getPaymentTokenAddress(): Promise<`0x${string}`> {
		// Null address means payment is in native token
		return zeroAddress;
	}

	public async getSubscriptionPrice(
		lockAddress: `0x${string}`
	): Promise<bigint> {
		const price = (await readContract({
			address: lockAddress,
			abi: publickLockAbi,
			functionName: "keyPrice",
		})) as bigint;

		return price;
	}

	public async checkSubscription(
		lockAddress: `0x${string}`
	): Promise<bigint> {
		const userAddress = store.getState().wallet.address;

		const balance = (await readContract({
			address: lockAddress,
			abi: publickLockAbi,
			functionName: "balanceOf",
			args: [userAddress],
		})) as bigint;

		return balance;
	}

	public async getTokenId(lockAddress: `0x${string}`): Promise<bigint> {
		const userAddress = store.getState().wallet.address;

		const tokenId = (await readContract({
			address: lockAddress,
			abi: publickLockAbi,
			functionName: "tokenOfOwnerByIndex",
			args: [userAddress, BigInt(0)],
		})) as bigint;

		return tokenId;
	}

	public async getRefundAmount(
		lockAddress: `0x${string}`,
		tokenId: bigint
	): Promise<bigint> {
		const refundAmount = (await readContract({
			address: lockAddress,
			abi: publickLockAbi,
			functionName: "getCancelAndRefundValue",
			args: [tokenId],
		})) as bigint;

		return refundAmount;
	}

	public async cancelSubscription(
		lockAddress: `0x${string}`,
		tokenId: bigint,
		setSuccessMessage: (value: string) => void,
		setErrorMessage: (value: string) => void,
		setIsLoading: (value: boolean) => void
	): Promise<void> {
		setIsLoading(true);
		try {
			const { hash } = await writeContract({
				address: lockAddress,
				abi: publickLockAbi,
				functionName: "cancelAndRefund",
				args: [tokenId],
			});

			// Wait for transaction to successfully complete
			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				setSuccessMessage("You successfully canceled!");
			} else {
				setErrorMessage("Something went wrong trying to cancel.");
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.message.includes("rejected")) {
				// Do nothing
			} else {
				let errorMessage;

				if (error.data && error.data.message) {
					errorMessage = error.data.message;
				} else if (
					error.error &&
					error.error.data &&
					error.error.data.message
				) {
					errorMessage = error.error.data.message;
				} else {
					errorMessage = error.toString();
				}

				setErrorMessage(
					`Something went wrong trying to cancel. \n${errorMessage}`
				);
			}
		}

		setIsLoading(false);
	}
	// ******************************************************************************************* //
}

export default SubscriptionService;
