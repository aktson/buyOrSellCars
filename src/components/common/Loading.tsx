/***** IMPORTS *****/
import { Container, Flex, Loader } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface LoadingProps {}

/***** COMPONENT-FUNCTION *****/
export const Loading: FC<LoadingProps> = (): JSX.Element | null => {
	/*** Return statement ***/
	return (
		<Container>
			<Flex justify="center" align="center" my="xl">
				<Loader mx="auto" />
			</Flex>
		</Container>
	);
};
