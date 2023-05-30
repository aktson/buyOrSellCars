"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { useListings } from "@/context/ListingsContext";
import dynamic from "next/dynamic";
import { Container, Flex, Grid, Slider, Stack, Text } from "@mantine/core";
import { ULink } from "@/components/common/ULink";
import { Card } from "@/components/common/Card";
import { ImageSlider } from "@/components/common/ImageSlider";
import { IListings } from "@/types/types";
import { RowFlexBox } from "@/components/common/FlexBox/RowFlexBox";
import { Listings } from "@/components/listings/Listings";
import { ColumnFlexBox } from "@/components/common/FlexBox/ColumnFlexBox";
import { MdOutlineHouse, MdTrendingFlat } from "react-icons/md";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element => {
	const { listings, error, isLoading } = useListings();

	const imgUrls = listings?.map((item: IListings) => {
		return item.data.imgUrls?.find((image) => image[0]);
	});

	// render recent listings for recommendations
	const recentForRent = listings?.filter((item: IListings) => item.data.type === "rent").slice(0, 3);
	const recentForSale = listings?.filter((item: IListings) => item.data.type === "sale").slice(0, 3);

	/*** Return statement ***/
	return (
		<section>
			<Container size="lg" mx="auto">
				{/* <RowFlexBox align="center" style={{ margin: "2em auto", padding: "2em", borderRadius: "0.5em" }} justify="center">
					<Card>
						<Stack spacing={0} align="center">
							<MdOutlineHouse size={100} />
							Properties for sale
						</Stack>
					</Card>
					<Card>
						<Stack spacing={0} align="center">
							<MdOutlineHouse size={100} />
							Properties for Rent
						</Stack>
					</Card>
				</RowFlexBox> */}
				<ImageSlider imgUrls={imgUrls} />
				<Stack my="xl" spacing={0}>
					<Flex justify="space-between" align="center" px="md">
						<Text component="h2" size="xl">
							Recetly added for sale
						</Text>
						<ULink href="/forRent" rightIcon={<MdTrendingFlat size={18} />}>
							See more
						</ULink>
					</Flex>
					<Listings listingsData={recentForSale} />
				</Stack>
				<Stack my="xl" spacing={0}>
					<Flex justify="space-between" align="center" px="md">
						<Text component="h2" size="xl">
							Recetly added For rent
						</Text>
						<ULink href="/forSale" rightIcon={<MdTrendingFlat size={18} />}>
							See more
						</ULink>
					</Flex>
					<Listings listingsData={recentForRent} />
				</Stack>
			</Container>
		</section>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
