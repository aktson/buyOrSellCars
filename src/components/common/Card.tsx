/***** IMPORTS *****/
import { Paper } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface CardProps {
	children: React.ReactNode;
	mx?: "xs" | "sm" | "md" | "lg" | "xl" | "auto";
	width?: string;
}

/***** COMPONENT-FUNCTION *****/
export const Card: FC<CardProps> = ({ children, mx, width }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Paper shadow="xs" p="2em" sx={{ maxWidth: `${width ? width : "350px"}` }} mx={mx}>
			{children}
		</Paper>
	);
};
