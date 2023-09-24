import { Token } from "../data/tokens";

export abstract class ITokenService {
	abstract getTokenBalance(token: Token): Promise<bigint>;

	// TODO: add getAllowance() and approve() methods
}
