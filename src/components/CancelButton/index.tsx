import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

import { ICancelButton } from "../../interfaces/components/cancelButton";
import { isAddress } from "../../resources";
import { ThemeContext } from "../../state/context/theme";
import { RootState } from "../../state/redux/store";

function CancelButton({
	action,
	lockAddress,
	isLoading,
	nativeBalance,
	errorMessage,
}: ICancelButton) {
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.wallet
	);
	const theme = useContext(ThemeContext);
	const [valid, setValid] = useState<boolean>(false);

	// Check validity of inputs to properly handle style and disability of button
	const checkValidity = async () => {
		let addressIsValid = false;
		if (lockAddress) {
			addressIsValid = isAddress(lockAddress);
		}

		const basicConditions = [
			!errorMessage,
			!isLoading,
			isWalletConnected,
			currentNetwork?.isSupported,
			nativeBalance > BigInt(0),
		];

		setValid(addressIsValid && basicConditions.every(Boolean));
	};

	useEffect(() => {
		checkValidity();
	}, [
		errorMessage,
		isLoading,
		isWalletConnected,
		currentNetwork,
		lockAddress,
		nativeBalance,
	]);

	return (
		<button
			style={{
				backgroundColor: theme.primaryColor,
				color: theme.buttonTextColor,
			}}
			className={`${
				valid
					? "opacity-90 duration-300 ease-in-out hover:opacity-100"
					: "cursor-not-allowed opacity-30"
			} min-h-12 flex w-9/12 items-center justify-center rounded-xl p-3 font-bold outline-none`}
			onClick={() => action()}
			disabled={!valid}
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				"Cancel"
			)}
		</button>
	);
}

export default CancelButton;
