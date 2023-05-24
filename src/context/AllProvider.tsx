"use client";
/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { MultiStepFormProvider } from "./MultiStepFormContext";
import { myTheme } from "@/app/styles/theme";
import { ListingsProvider } from "./ListingsContext";

/***** TYPES *****/
interface AllProviderProps {
	children: React.ReactNode;
}

/***** COMPONENT-FUNCTION *****/
export const AllProvider: FC<AllProviderProps> = ({ children }): JSX.Element => {
	/***States */
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	/*** Return statement ***/
	return (
		<AuthProvider>
			<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
				<MantineProvider theme={{ ...myTheme, colorScheme }} withNormalizeCSS withCSSVariables withGlobalStyles>
					<ListingsProvider>
						<MultiStepFormProvider>{children}</MultiStepFormProvider>
					</ListingsProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</AuthProvider>
	);
};
