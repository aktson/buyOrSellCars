"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { myTheme } from "@/app/styles/theme";
import { ListingsProvider } from "./ListingsContext";
import { useLocalStorage } from "@mantine/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/***** TYPES *****/
interface AllProviderProps {
	children: React.ReactNode;
}
const queryClient = new QueryClient();

/***** COMPONENT-FUNCTION *****/
export const AllProvider: FC<AllProviderProps> = ({ children }): JSX.Element => {
	/***States */
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	/*** Return statement ***/
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider theme={{ ...myTheme, colorScheme }} withNormalizeCSS withCSSVariables withGlobalStyles>
						{children}
					</MantineProvider>
				</ColorSchemeProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};
