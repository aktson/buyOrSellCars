"use client";
/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { AuthProvider } from "./AuthContext";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { MultiStepFormProvider } from "./MultiStepFormContext";
import { myTheme } from "@/app/styles/theme";
import { ListingsProvider } from "./ListingsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/***** TYPES *****/
interface AllProviderProps {
	children: React.ReactNode;
}
const queryClient = new QueryClient();
/***** COMPONENT-FUNCTION *****/
export const AllProvider: FC<AllProviderProps> = ({ children }): JSX.Element => {
	/***States */
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

	/*** Return statement ***/
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider theme={{ ...myTheme, colorScheme }} withNormalizeCSS withCSSVariables withGlobalStyles>
						<ListingsProvider>
							<MultiStepFormProvider>
								<ReactQueryDevtools initialIsOpen={false} />
								{children}
							</MultiStepFormProvider>
						</ListingsProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};
