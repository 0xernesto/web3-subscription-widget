import { chainData } from "../data/chains";
import { IGetChain } from "../interfaces/resources/getChain";

export const getChain = ({ name, chainId }: IGetChain) => {
	if (name) {
		return chainData[chainData.findIndex((chain) => chain.name === name)];
	}

	if (chainId) {
		return chainData[
			chainData.findIndex((chain) => chain.chainId === chainId)
		];
	}
	return undefined;
};
