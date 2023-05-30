/***** IMPORTS *****/
import { Alert, Container } from "@mantine/core";
import React, { FC } from "react";
import { MdOutlineError } from "react-icons/md";

/***** TYPES *****/
interface AlertBoxProps {
	text?: any;
	color?: string;
	title?: string;
}

/***** COMPONENT-FUNCTION *****/
export const AlertBox: FC<AlertBoxProps> = ({ text, color }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container my="xl" size="xs">
			<Alert icon={<MdOutlineError size="1rem" />} title="Error!" color={color}>
				{text}
			</Alert>
		</Container>
	);
};
