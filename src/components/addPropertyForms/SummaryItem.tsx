/***** IMPORTS *****/
import { Stack, Text } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface SummaryItemProps {
	label: string;
	text?: string | null | number;
}

/***** COMPONENT-FUNCTION *****/
export const SummaryItem: FC<SummaryItemProps> = ({ label, text }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Stack spacing="xs" sx={{ width: "100%", background: "rgba(211, 211, 211, 0.1)", borderRadius: "0.5em" }} py="xs" px="lg">
			<Text fw={500}>{label}</Text>
			<Text color="dimmed">{text}</Text>
		</Stack>
	);
};
