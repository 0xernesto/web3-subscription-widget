import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

import iconEthereum from "../../assets/images/iconEthereum.svg";
import { ISubscription } from "../../interfaces/components/subscription";
import { getChain, getSubscriptionService } from "../../resources";
import { ThemeContext } from "../../state/context/theme";
import { RootState } from "../../state/redux/store";
import { getTokenDisplayUnits } from "../../utils/getTokenDisplayUnits";
import CancelButton from "../CancelButton";
import ConnectWalletDropdown from "../ConnectWalletDropdown";
import Footer from "../Footer";
import Header from "../Header";
import SubscribeButton from "../SubscribeButton";
import SwitchNetworkButton from "../SwitchNetworkButton";

function Subscription({ lockConfig, maxWidth }: ISubscription) {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [subPrice, setSubPrice] = useState<bigint>(BigInt(0));
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
	const [tokenId, setTokenId] = useState<bigint | null>(null);
	const [refundAmount, setRefundAmount] = useState<bigint | null>(null);
	const theme = useContext(ThemeContext);

	const maxW = maxWidth ?? 430;

	const checkSubStatus = async () => {
		const balance = await getSubscriptionService().checkSubscription(
			lockConfig.lockAddress
		);

		if (balance > 0) {
			setIsSubscribed(true);
			const subTokenId = await getSubscriptionService().getTokenId(
				lockConfig.lockAddress
			);

			setTokenId(subTokenId);

			const subRefundAmount =
				await getSubscriptionService().getRefundAmount(
					lockConfig.lockAddress,
					subTokenId!
				);

			setRefundAmount(subRefundAmount);
		} else {
			const lockPrice =
				await getSubscriptionService().getSubscriptionPrice(
					lockConfig.lockAddress
				);

			setSubPrice(lockPrice);
		}
	};

	const initiateSubscription: () => Promise<void> = async () => {
		await getSubscriptionService().subscribe(
			lockConfig.lockAddress,
			subPrice,
			setSuccessMessage,
			setErrorMessage,
			setIsLoading
		);
	};

	const cancelSubscription: () => Promise<void> = async () => {
		await getSubscriptionService().cancelSubscription(
			lockConfig.lockAddress,
			tokenId!,
			setSuccessMessage,
			setErrorMessage,
			setIsLoading
		);
	};

	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork?.isSupported &&
			currentNetwork!.chainId === lockConfig.lockNetwork
		) {
			checkSubStatus();
		} else {
			setIsSubscribed(false);
			setTokenId(null);
			setRefundAmount(null);
			setSubPrice(BigInt(0));
		}
	}, [isWalletConnected, currentNetwork, successMessage]);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div
				style={{
					maxWidth: `${maxW}px`,
					minWidth: "300px",
					backgroundColor: theme.containerBackgroundColor,
					boxShadow: `0 0 0 1px ${theme.containerOutlineColor}`,
					color: theme.primaryTextColor,
					fontFamily: theme.fontFamily,
				}}
				className="flex w-full flex-shrink flex-col items-center justify-center rounded-xl p-5 ring-1"
			>
				<Header lockNetwork={lockConfig.lockNetwork} />
				{isSubscribed ? (
					<span className="text-lg font-bold">
						You&apos;re already subscribed!
					</span>
				) : (
					<span className="text-lg font-bold">Subscribe now!</span>
				)}
				<div className="mt-5 flex w-full items-center justify-center">
					<img
						src={lockConfig.iconUrl}
						alt="Lock Subscription Icon"
						className="mr-2"
						style={{ width: "30px", height: "30px" }}
					/>
					<span>{lockConfig.lockName}</span>
				</div>
				{successMessage ? (
					<div className="mt-3 flex flex-col items-center justify-center">
						<span style={{ color: theme.goodColor }}>
							{successMessage}
						</span>
						<button
							style={{ color: theme.primaryColor }}
							className="text-lg font-bold opacity-90 duration-300 ease-in-out hover:opacity-100"
							onClick={() => setSuccessMessage("")}
						>
							OK
						</button>
					</div>
				) : (
					<div className="mt-5 flex w-full flex-col items-center justify-center">
						{isWalletConnected ? (
							currentNetwork!.chainId !==
							lockConfig.lockNetwork ? (
								<SwitchNetworkButton
									lockNetwork={lockConfig.lockNetwork}
									isLoading={isLoading}
								/>
							) : isSubscribed && tokenId && refundAmount ? (
								<>
									<div className="mt-3 flex w-full items-center justify-center">
										<span className="mr-2 font-bold">
											Refund Amount:{" "}
										</span>
										<img
											src={iconEthereum}
											alt="Payment Token Icon"
											className="mr-2"
											style={{
												width: "30px",
												height: "30px",
											}}
										/>
										<span>
											{getTokenDisplayUnits(
												refundAmount!,
												18
											)}{" "}
											ETH (~$
											{(
												(Number(refundAmount) *
													1592.54) /
												1e18
											).toFixed(3)}
											)
										</span>
									</div>
									<div className="mt-5" />
									<CancelButton
										action={cancelSubscription}
										lockAddress={lockConfig.lockAddress}
										isLoading={isLoading}
										nativeBalance={BigInt(
											nativeBalance!.value
										)}
										errorMessage={errorMessage}
									/>
								</>
							) : (
								<>
									{/* TODO: Properly handle conditional rendering of payment token to support ERC20 payments */}
									<div className="mt-3 flex w-full items-center justify-center">
										<span className="mr-2 font-bold">
											Price:{" "}
										</span>
										<img
											src={iconEthereum}
											alt="Payment Token Icon"
											className="mr-2"
											style={{
												width: "30px",
												height: "30px",
											}}
										/>
										<span>
											{getTokenDisplayUnits(subPrice, 18)}{" "}
											ETH (~$
											{(
												(Number(subPrice) * 1592.54) /
												1e18
											).toFixed(3)}
											)
										</span>
									</div>
									<div className="mt-5" />
									<SubscribeButton
										action={initiateSubscription}
										lockAddress={lockConfig.lockAddress}
										isLoading={isLoading}
										nativeBalance={BigInt(
											nativeBalance!.value
										)}
										errorMessage={errorMessage}
									/>
									{BigInt(nativeBalance!.value) ===
									BigInt(0) ? (
										<span
											style={{ color: theme.badColor }}
											className="mt-3"
										>
											Insufficient{" "}
											{isWalletConnected &&
											currentNetwork?.isSupported
												? getChain({
														chainId:
															currentNetwork!
																.chainId,
												  })!.nativeCurrency.symbol
												: "native"}{" "}
											for gas.
										</span>
									) : null}
									{errorMessage ? (
										<div className="mt-3 flex w-full items-center justify-center">
											<span
												style={{
													color: theme.badColor,
												}}
												className="break-all"
											>
												{errorMessage}
											</span>
										</div>
									) : null}
								</>
							)
						) : (
							<ConnectWalletDropdown
								isLoading={isLoading}
								setIsLoading={setIsLoading}
							/>
						)}
					</div>
				)}
				<Footer />
			</div>
		</div>
	);
}

export default Subscription;
