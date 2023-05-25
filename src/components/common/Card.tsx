/***** IMPORTS *****/
import { Paper, useMantineTheme } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface CardProps {
	children: React.ReactNode;
	mx?: "xs" | "sm" | "md" | "lg" | "xl" | "auto";
	width?: string;
}

/***** COMPONENT-FUNCTION *****/
export const Card: FC<CardProps> = ({ children, mx, width }): JSX.Element => {
	const theme = useMantineTheme();
	/*** Return statement ***/
	return (
		<Paper
			p="2em"
			mx={mx}
			sx={{
				boxShadow: theme.colorScheme === "dark" ? `0px 2px 8px ${theme.colors.dark[5]}` : theme.shadows.xs,
				maxWidth: `${width ? width : "350px"}`,
			}}>
			{children}
		</Paper>
	);
};
