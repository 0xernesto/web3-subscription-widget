/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
import erc20Abi from "../abis/erc20.json";
import { Token } from "../interfaces/data/tokens";
import { ITokenService } from "../interfaces/services/token";
import { readContract } from "../resources";
import store from "../state/redux/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class TokenService extends ITokenService {
	private static instance: TokenService;

	private constructor() {
		super();
	}

	public static getInstance(): TokenService {
		if (!TokenService.instance) {
			TokenService.instance = new TokenService();
		}
		return TokenService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async getTokenBalance(token: Token): Promise<bigint> {
		const account = store.getState().wallet.address;
		const balance = await readContract({
			address: token.address,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [account],
		});

		return balance as bigint;
	}

	// TODO: add getAllowance() and approve() methods
	// ******************************************************************************************* //
}

export default TokenService;
