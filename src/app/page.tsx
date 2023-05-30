"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { useListings } from "@/context/ListingsContext";
import { ListingItem } from "@/components/ListingItem";
import dynamic from "next/dynamic";
import { Container, Grid } from "@mantine/core";
import { IListings } from "@/types/types";
import { AlertBox } from "@/components/common/AlertBox";
import { Loading } from "@/components/common/Loading";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element => {
	const { listings, error, isLoading } = useListings();

	/*** Return statement ***/

	if (listings?.length === 0) return <AlertBox text="No listings found" />;
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<section>
			<Container size="lg" mx="auto" my="xl">
				<Grid>
					{listings?.map((item: IListings) => {
						return (
							<Grid.Col span={4} key={item?.id}>
								<ListingItem item={item} />
							</Grid.Col>
						);
					})}
				</Grid>
			</Container>
		</section>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
