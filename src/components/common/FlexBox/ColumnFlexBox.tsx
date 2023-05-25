/***** IMPORTS *****/
import { Flex } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
type AlignValue = "center" | "flex-start" | "flex-end";
type JustifyValue = "center" | "flex-start" | "flex-end" | "space-around" | "space-between";

interface ColumnFlexBoxProps {
	children: React.ReactNode;
	align?: AlignValue | { base: AlignValue; sm: AlignValue; md: AlignValue };
	justify?: JustifyValue | { base: JustifyValue; sm: JustifyValue; md: AlignValue };
	rowOnSmall?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const ColumnFlexBox: FC<ColumnFlexBoxProps> = ({ children, align, justify, rowOnSmall }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Flex gap="md" direction={{ base: rowOnSmall ? "row" : "column", sm: "column" }} align={align} justify={justify}>
			{children}
		</Flex>
	);
};
