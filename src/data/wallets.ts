import iconCoinbase from "../assets/images/iconCoinbase.svg";
import iconInjected from "../assets/images/iconInjected.svg";
import iconLedger from "../assets/images/iconLedger.svg";
import iconMetamask from "../assets/images/iconMetamask.svg";
import iconSafe from "../assets/images/iconSafe.png";
import iconWalletConnect from "../assets/images/iconWalletConnect.svg";
import { Wallet, WalletType } from "../interfaces/state/wallet";

export const walletList: Wallet[] = [
	{
		type: WalletType.INJECTED,
		label: "Browser",
		imageSource: iconInjected,
	},
	{
		type: WalletType.METAMASK,
		label: "Metamask",
		imageSource: iconMetamask,
	},
	{
		type: WalletType.WALLETCONNECT,
		label: "WalletConnect",
		imageSource: iconWalletConnect,
	},
	{
		type: WalletType.COINBASE,
		label: "Coinbase",
		imageSource: iconCoinbase,
	},
	{
		type: WalletType.SAFE,
		label: "Safe",
		imageSource: iconSafe,
	},
	{
		type: WalletType.LEDGER,
		label: "Ledger",
		imageSource: iconLedger,
	},
];
