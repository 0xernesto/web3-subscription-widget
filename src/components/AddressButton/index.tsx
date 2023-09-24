import React, { useContext, useState } from "react";
import { FiCheckSquare, FiCopy } from "react-icons/fi";

import { IAddressButton } from "../../interfaces/components/addressButton";
import { ThemeContext } from "../../state/context/theme";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { truncateAddress } from "../../utils/truncateAddress";

function AddressButton({ address, ens }: IAddressButton) {
	const theme = useContext(ThemeContext);
	const [copied, setCopied] = useState<boolean>(false);
	const [hover, setHover] = useState<boolean>(false);

	return (
		<button
			style={{
				color: hover ? theme.primaryColor : theme.primaryTextColor,
			}}
			className="flex items-center justify-start px-2 py-1 outline-none duration-300 ease-in-out"
			onClick={() => copyToClipboard(address!, setCopied)}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<span className="mr-2">
				{ens?.name ? ens.name : truncateAddress(address!)}
			</span>
			{!copied && hover ? (
				<FiCopy size="12px" />
			) : copied ? (
				<FiCheckSquare style={{ color: theme.goodColor }} size="12px" />
			) : null}
		</button>
	);
}

export default AddressButton;
