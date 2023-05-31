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
	listings?: IListings[] | DocumentData | null;
	grow?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const Listings: FC<ListingsProps> = ({ listings, grow = true }): JSX.Element => {
	/*** Variables */
	const { isLoading, error } = useListings();

	/*** Return statement ***/
	if (listings?.length === 0) return <AlertBox text="No listings found" />;
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<Container size="lg" mx="auto" my="xl">
			<Grid grow={grow}>
				{listings?.map((item: IListings) => {
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
