"use client";
/***** IMPORTS *****/
import { Listings } from "@/components/listings/Listings";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Box, Container } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface ForSaleProps {}

/***** COMPONENT-FUNCTION *****/
const ForSale: FC<ForSaleProps> = (): JSX.Element => {
	// render breadcrumbItems
	const breadcrumbItems = [
		{ title: "Home", href: "/" },
		{ title: "Properties for sale", href: "/forSale" },
	];

	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			<Box px="sm">
				<BreadCrumb items={breadcrumbItems} />
			</Box>
			<Listings forSale={true} />
		</Container>
	);
};
export default ForSale;
