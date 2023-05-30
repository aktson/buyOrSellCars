"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { useListings } from "@/context/ListingsContext";
import dynamic from "next/dynamic";
import { Container } from "@mantine/core";
import { ULink } from "@/components/common/ULink";
import { Card } from "@/components/common/Card";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element => {
	const { listings, error, isLoading } = useListings();

	/*** Return statement ***/
	return (
		<section>
			<Container>
				{/* <Listings listings={listings} isLoading={isLoading} error={error} /> */}
				<ULink href="/forRent">
					<Card>For Rent </Card>
				</ULink>
				<ULink href="/forSale">
					<Card>For Sale </Card>
				</ULink>
			</Container>
		</section>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
