"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import { MantineProvider } from "@mantine/core";
import { MultiStepFormProvider } from "./MultiStepFormContext";
import { myTheme } from "@/app/styles/theme";
import { ListingsProvider } from "./ListingsContext";

/***** TYPES *****/
interface AllProviderProps {
	children: React.ReactNode;
}

/***** COMPONENT-FUNCTION *****/
export const AllProvider: FC<AllProviderProps> = ({ children }): JSX.Element => {
	/*** Return statement ***/
	return (
		<AuthProvider>
			<MantineProvider theme={myTheme} withNormalizeCSS withCSSVariables withGlobalStyles>
				<ListingsProvider>
					<MultiStepFormProvider>{children}</MultiStepFormProvider>
				</ListingsProvider>
			</MantineProvider>
		</AuthProvider>
	);
};
