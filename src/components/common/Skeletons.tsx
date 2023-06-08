/***** IMPORTS *****/
import { Grid, Container } from "@mantine/core";
import React, { FC } from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

/***** TYPES *****/
interface SkeletonsProps {
	skeletons?: number;
}

/***** COMPONENT-FUNCTION *****/
export const Skeletons: FC<SkeletonsProps> = ({ skeletons = 6 }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container my="xl">
			<Grid justify="center" align="center">
				{Array.from({ length: skeletons }).map((_, index) => (
					<Grid.Col md={6} lg={4} key={index} mx="auto">
						<LoadingSkeleton />
					</Grid.Col>
				))}
			</Grid>
		</Container>
	);
};
