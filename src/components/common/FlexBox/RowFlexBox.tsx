/***** IMPORTS *****/
import { Flex } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
type AlignValue = "center" | "flex-start" | "flex-end";
type JustifyValue = "center" | "flex-start" | "flex-end" | "space-around" | "space-between";

interface RowFlexBoxProps {
	children: React.ReactNode;
	align?: AlignValue | { base?: AlignValue; sm?: AlignValue; md?: AlignValue };
	justify?: JustifyValue | { base?: JustifyValue; sm?: JustifyValue; md?: AlignValue };
	columnOnSmall?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const RowFlexBox: FC<RowFlexBoxProps> = ({ children, align, justify, columnOnSmall = true }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Flex gap="md" direction={{ base: columnOnSmall ? "column" : "row", sm: "row" }} align={align} justify={justify}>
			{children}
		</Flex>
	);
};