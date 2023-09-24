import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { ISwitchNetworkButton } from "../../interfaces/components/switchNetwork";
import { getWalletService } from "../../resources";
import { ThemeContext } from "../../state/context/theme";

function SwitchNetworkButton({ lockNetwork, isLoading }: ISwitchNetworkButton) {
	const theme = useContext(ThemeContext);

	return (
		<button
			style={{
				backgroundColor: theme.primaryColor,
				color: theme.buttonTextColor,
			}}
			className="min-h-12 flex w-9/12 items-center justify-center rounded-xl p-3 font-bold opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
			onClick={() =>
				getWalletService().switchNetwork({
					chainId: lockNetwork,
					isSupported: true,
				})
			}
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				"Switch Network"
			)}
		</button>
	);
}

export default SwitchNetworkButton;
