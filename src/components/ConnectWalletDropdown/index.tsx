import { Menu, Transition } from "@headlessui/react";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { walletList } from "../../data/wallets";
import { IConnectWalletDropdown } from "../../interfaces/components/connectWalletDropdown";
import { Wallet } from "../../interfaces/state/wallet";
import { getWalletService } from "../../resources";
import { ThemeContext } from "../../state/context/theme";

function ConnectWalletDropdown({
	isLoading,
	setIsLoading,
}: IConnectWalletDropdown) {
	const theme = useContext(ThemeContext);

	const connectWallet = async (wallet: Wallet): Promise<void> => {
		await getWalletService().connectWallet(setIsLoading, wallet);
	};

	return (
		<Menu
			as="div"
			className="flex h-12 w-11/12 max-w-[300px] flex-col items-center justify-center rounded-lg outline-none"
		>
			{({ open }) => (
				<div className="relative h-full w-full">
					<span className="inline-block h-full w-full">
						<Menu.Button
							style={{
								backgroundColor: theme.primaryColor,
								color: theme.buttonTextColor,
							}}
							className="min-h-12 flex w-full items-center justify-center rounded-xl p-3 font-bold opacity-90 outline-none duration-300 ease-in-out hover:opacity-100"
						>
							{isLoading ? (
								<AiOutlineLoading3Quarters
									className="animate-spin"
									size="22px"
								/>
							) : (
								"Connect Wallet"
							)}
						</Menu.Button>
					</span>
					<Transition
						show={open}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Menu.Items
							static
							style={{
								backgroundColor: theme.dropdownBackgroundColor,
								boxShadow: `0 0 0 1px ${theme.dropdownOutlineColor}`,
							}}
							className={`${
								open && "relative z-10"
							} mt-2 overflow-hidden overflow-y-auto rounded-lg outline-none`}
						>
							{walletList.map((wallet) => (
								<Menu.Item key={wallet.label}>
									{({ active }) => (
										<button
											style={{
												backgroundColor: active
													? theme.optionActiveColor
													: theme.dropdownBackgroundColor,
												color: active
													? theme.primaryColor
													: theme.primaryTextColor,
											}}
											className="relative flex h-12 w-full cursor-pointer select-none items-center justify-start p-2 pr-4"
											onClick={() =>
												connectWallet(wallet)
											}
										>
											<div className="mr-5 flex h-12 w-12 items-center justify-center">
												<img
													className="w-8"
													alt="listedWalletImage"
													src={wallet.imageSource}
												/>
											</div>
											<span>{wallet.label}</span>
										</button>
									)}
								</Menu.Item>
							))}
						</Menu.Items>
					</Transition>
				</div>
			)}
		</Menu>
	);
}

export default ConnectWalletDropdown;
