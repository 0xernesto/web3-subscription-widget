import React, { useContext, useState } from "react";
import { FiExternalLink } from "react-icons/fi";

import { IBlockExplorerButton } from "../../interfaces/components/blockExplorerButton";
import { getChain } from "../../resources";
import { ThemeContext } from "../../state/context/theme";

function BlockExplorerButton({
	address,
	currentNetwork,
}: IBlockExplorerButton) {
	const theme = useContext(ThemeContext);
	const [hover, setHover] = useState<boolean>(false);

	return (
		<div className="flex w-full items-center justify-start px-2 py-1 outline-none">
			<a
				style={{
					color: hover ? theme.primaryColor : theme.primaryTextColor,
				}}
				className="mr-2 flex items-center justify-start outline-none duration-300 ease-in-out"
				href={`${
					getChain({
						chainId: currentNetwork!.chainId,
					})!.blockExplorer
				}/address/${address}`}
				target="_blank"
				rel="noopener noreferrer"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				View on explorer
			</a>
			{hover ? <FiExternalLink size="12px" /> : null}
		</div>
	);
}

export default BlockExplorerButton;
