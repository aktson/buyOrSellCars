/***** IMPORTS *****/
import React, { FC } from "react";
import { IListings } from "@/types/types";
import { Container, Grid } from "@mantine/core";
import { AlertBox } from "../common/AlertBox";
import { Loading } from "../common/Loading";
import { useListings } from "@/context/ListingsContext";
import { ListingItem } from "./ListingItem";
import { DocumentData } from "firebase/firestore";

/***** TYPES *****/
interface ListingsProps {
	forSale?: boolean;
	forRent?: boolean;
	listingsData?: IListings[] | DocumentData | null;
	grow?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const Listings: FC<ListingsProps> = ({ forSale, forRent, listingsData, grow = true }): JSX.Element => {
	/*** Variables */
	const { isLoading, error, listings } = useListings();
	let listingToRender = [] as IListings[] | DocumentData | null;

	const forSaleListings = listings?.filter((item: IListings) => item.data.type === "sale");
	const forRentListings = listings?.filter((item: IListings) => item.data.type === "rent");

	// Render listing accoding to prop passed in
	if (forRent) listingToRender = forRentListings;
	if (forSale) listingToRender = forSaleListings;
	if (listingsData) listingToRender = listingsData;

	/*** Return statement ***/
	if (listingToRender?.length === 0) return <AlertBox text="No listings found" />;
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<Container size="lg" mx="auto" my="xl">
			<Grid grow={grow}>
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
