"use client";
/***** IMPORTS *****/
import { Listings } from "@/components/listings/Listings";
import { Container } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface ForSaleProps {}

/***** COMPONENT-FUNCTION *****/
const ForSale: FC<ForSaleProps> = (): JSX.Element => {
	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			ProptertiesForSale
			<Listings forSale={true} />
		</Container>
	);
};
export default ForSale;
