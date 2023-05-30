"use client";
/***** IMPORTS *****/
import { Listings } from "@/components/Listings";
import { Container } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface ForRentProps {}

/***** COMPONENT-FUNCTION *****/
const ForRent: FC<ForRentProps> = (): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			ProptertiesForRent
			<Listings forRent={true} />
		</Container>
	);
};
export default ForRent;
