import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { IHeader } from "../../interfaces/components/header";
import { ThemeContext } from "../../state/context/theme";
import { RootState } from "../../state/redux/store";
import { getTokenDisplayUnits } from "../../utils/getTokenDisplayUnits";
import AddressButton from "../AddressButton";
import BlockExplorerButton from "../BlockExplorerButton";
import DisconnectWalletButton from "../DisconnectWalletButton";

function Header({ lockNetwork }: IHeader) {
	const { isWalletConnected, address, ens, nativeBalance, currentNetwork } =
		useSelector((state: RootState) => state.wallet);

	const theme = useContext(ThemeContext);

	return (
		<div className="mb-5 flex w-full items-center justify-between text-sm">
			{isWalletConnected ? (
				<div className="flex w-full items-center justify-between">
					<div className="flex w-36 flex-shrink-0 flex-col items-start justify-center">
						<AddressButton address={address!} ens={ens!} />
						{currentNetwork?.isSupported &&
						currentNetwork?.chainId === lockNetwork ? (
							<BlockExplorerButton
								address={address!}
								currentNetwork={currentNetwork!}
							/>
						) : (
							<span
								style={{ color: theme.badColor }}
								className="px-2 py-1"
							>
								CHAIN NOT SUPPORTED
							</span>
						)}
					</div>
					<div className="flex flex-col items-start justify-center">
						{currentNetwork?.isSupported ? (
							<span className="px-2 py-1">
								{getTokenDisplayUnits(
									BigInt(nativeBalance!.value),
									nativeBalance!.decimals
								)}{" "}
								{nativeBalance!.symbol}
							</span>
						) : null}
						<DisconnectWalletButton />
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Header;
