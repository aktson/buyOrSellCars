"use client";
/***** IMPORTS *****/
import React, { FC, Suspense } from "react";
import { useListings } from "@/context/ListingsContext";
import { ListingItem } from "@/components/ListingItem";
import dynamic from "next/dynamic";
import { Container, Grid } from "@mantine/core";
import Link from "next/link";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element => {
	const { listings, loading, error } = useListings();

	/*** Return statement ***/

	if (listings?.length === 0) return <p>No listings available</p>;
	return (
		<Suspense fallback={<p>loading...</p>}>
			<section>
				<Container size="lg" mx="auto" my="xl">
					<Grid>
						{listings?.map((item) => {
							return (
								<Grid.Col span={4} key={item?.id}>
									<ListingItem item={item} />
								</Grid.Col>
							);
						})}
					</Grid>
				</Container>
			</section>
		</Suspense>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
