"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { useListings } from "@/context/ListingsContext";
import dynamic from "next/dynamic";
import { Container, Flex, Space, Stack, Text } from "@mantine/core";
import { ULink } from "@/components/common/ULink";
import { IListings } from "@/types/types";
import { Listings } from "@/components/listings/Listings";
import { MdTrendingFlat } from "react-icons/md";
import { Loading } from "@/components/common/Loading";
import { AlertBox } from "@/components/common/AlertBox";
import { FrontPageSlider } from "@/components/common/FrontPageSlider";
import { generatePageTitle } from "@/functions/functions";

/***** COMPONENT-FUNCTION *****/
const Home: FC = (): JSX.Element => {
	/*** Variables */
	const { listings, error, isLoading } = useListings();
	console.log(listings);
	// render recent listings for recommendations
	const recentForRent = listings?.filter((item: IListings) => item.data.type === "rent").slice(0, 3);
	const recentForSale = listings?.filter((item: IListings) => item.data.type === "sale").slice(0, 3);

	/*** Return statement ***/
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<>
			<title>{generatePageTitle("Home")}</title>
			<section>
				<Container size="lg" mx="auto">
					<FrontPageSlider />
					<Space h="xl" />
					<Stack my="xl" spacing={0}>
						<Flex justify="space-between" align="center" py="sm">
							<Text component="h2" size="xl">
								Recetly added for sale
							</Text>
							<ULink href="/forRent" rightIcon={<MdTrendingFlat size={18} />}>
								See more
							</ULink>
						</Flex>
						<Listings listings={recentForSale} />
					</Stack>
					<Stack my="xl" spacing={0}>
						<Flex justify="space-between" align="center" py="sm">
							<Text component="h2" size="xl">
								Recetly added For rent
							</Text>
							<ULink href="/forSale" rightIcon={<MdTrendingFlat size={18} />}>
								See more
							</ULink>
						</Flex>
						<Listings listings={recentForRent} />
					</Stack>
				</Container>
			</section>
		</>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
