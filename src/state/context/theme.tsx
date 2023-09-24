import React, { createContext, PropsWithChildren } from "react";

import { Theme } from "../../interfaces/state/theme";

export const defaultTheme: Theme = {
	primaryColor: "#cc0202",
	goodColor: "#47A66F",
	badColor: "#CC4545",
	primaryTextColor: "#000000",
	secondaryTextColor: "#4A4A4A",
	buttonTextColor: "#FFFFFF",
	containerBackgroundColor: "#FEF7EA",
	containerOutlineColor: "#DDF087",
	dropdownBackgroundColor: "#FEF7EA",
	dropdownOutlineColor: "#000000",
	optionActiveColor: "#C9C9C9",
	fontFamily: "sans-serif",
};

export const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({
	children,
	theme = defaultTheme,
}: PropsWithChildren<{ theme: Theme }>) {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
}
