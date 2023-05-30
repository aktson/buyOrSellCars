"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { useListings } from "@/context/ListingsContext";
import dynamic from "next/dynamic";
import { Container, Flex, Grid, Slider, Stack } from "@mantine/core";
import { ULink } from "@/components/common/ULink";
import { Card } from "@/components/common/Card";
import { ImageSlider } from "@/components/common/ImageSlider";
import { IListings } from "@/types/types";
import { RowFlexBox } from "@/components/common/FlexBox/RowFlexBox";
import { Listings } from "@/components/listings/Listings";
import { ColumnFlexBox } from "@/components/common/FlexBox/ColumnFlexBox";
import { MdTrendingFlat } from "react-icons/md";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element => {
	const { listings, error, isLoading } = useListings();

	const imgUrls = listings?.map((item: IListings) => {
		return item.data.imgUrls?.find((image) => image[0]);
	});

	/*** Return statement ***/
	return (
		<section>
			<ImageSlider imgUrls={imgUrls} />
			<Container size="lg">
				<Stack my="xl" spacing={0}>
					<Flex justify="space-between" align="center" px="md">
						<h2>Recetly added for sale</h2>
						<ULink href="/forRent" rightIcon={<MdTrendingFlat size={18} />}>
							See more
						</ULink>
					</Flex>
					<Listings forSale={true} />
				</Stack>
				<Stack my="xl" spacing={0}>
					<Flex justify="space-between" align="center" px="md">
						<h2>Recetly added For rent</h2>
						<ULink href="/forSale" rightIcon={<MdTrendingFlat size={18} />}>
							See more
						</ULink>
					</Flex>
					<Listings forSale={true} />
				</Stack>
			</Container>
		</section>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
