/***** IMPORTS *****/
import { IListings } from "@/types/types";
import { Container, Grid } from "@mantine/core";
import React, { FC } from "react";
import { ListingItem } from "./ListingItem";
import { AlertBox } from "./common/AlertBox";
import { Loading } from "./common/Loading";
import { useListings } from "@/context/ListingsContext";

/***** TYPES *****/
interface ListingsProps {
	forSale?: boolean;
	forRent?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const Listings: FC<ListingsProps> = ({ forSale, forRent }): JSX.Element => {
	const { isLoading, error, listings } = useListings();
	let listingToRender = [];

	const forSaleListings = listings?.filter((item: IListings) => item.data.type === "sale");
	const forRentListings = listings?.filter((item: IListings) => item.data.type === "rent");

	if (forRent) listingToRender = forRentListings;
	if (forSale) listingToRender = forSaleListings;

	if (listings?.length === 0) return <AlertBox text="No listings found" />;
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			<Grid>
				{listingToRender?.map((item: IListings) => {
					return (
						<Grid.Col span={4} key={item?.id}>
							<ListingItem item={item} />
						</Grid.Col>
					);
				})}
			</Grid>
		</Container>
	);
};
