/***** IMPORTS *****/
import { Alert, Container } from "@mantine/core";
import React, { FC } from "react";
import { MdOutlineError } from "react-icons/md";

/***** TYPES *****/
interface ErrorProps {
	error?: any;
}

/***** COMPONENT-FUNCTION *****/
export const Error: FC<ErrorProps> = ({ error }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container my="xl" size="xs">
			<Alert icon={<MdOutlineError size="1rem" />} title="Error!" color="red">
				{error}
			</Alert>
		</Container>
	);
};
