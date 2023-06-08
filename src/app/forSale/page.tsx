"use client";
/***** IMPORTS *****/
import { Listings } from "@/components/listings/Listings";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Container, Flex, Select } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { IListings } from "@/types/types";
import { generatePageTitle } from "@/functions/functions";
import { useListingsQuery } from "@/hooks/listingHooks/useListingsQuery";
import { DocumentData } from "firebase/firestore";
import { Skeletons } from "@/components/common/Skeletons";
import { AlertBox } from "@/components/common/AlertBox";
import { useQueryClient } from "@tanstack/react-query";

/***** COMPONENT-FUNCTION *****/
const ForSale: FC = (): JSX.Element => {
	//fetch listings
	const { listings, error, isLoading } = useListingsQuery("sale");
	const queryClient = useQueryClient();

	/*** States */
	const [value, setValue] = useState<string | null>(null);
	const [listingToRender, setListingToRender] = useState<IListings[] | DocumentData | []>([]);

	/*** Variables */
	// render breadcrumbItems
	const breadcrumbItems = [
		{ title: "Home", href: "/" },
		{ title: "Properties for sale", href: "/forSale" },
	];

	/*** Functions ***/

	/** handles onchange event on select and renders and sorts listings according to newvalue passed
	 * @param {event}
	 * @return {void}
	 */
	const handleOnChange = (newValue: string | null) => {
		setValue(newValue);

		switch (newValue) {
			case "oldest":
				const oldestListing = listingToRender?.sort((a: IListings, b: IListings) => {
					const aTimestamp = a.data.timestamp.seconds * 1000 + a.data.timestamp.nanoseconds / 1e6;
					const bTimestamp = b.data.timestamp.seconds * 1000 + b.data.timestamp.nanoseconds / 1e6;
					return aTimestamp - bTimestamp;
				});
				setListingToRender(oldestListing);
				break;
			case "lowestPrice":
				const lowestPriceListings = listingToRender?.sort((a: IListings, b: IListings) => {
					return a.data.price - b.data.price;
				});
				setListingToRender(lowestPriceListings);
				break;
			case "highestPrice":
				const highestPriceListings = listingToRender?.sort((a: IListings, b: IListings) => {
					return b.data.price - a.data.price;
				});
				setListingToRender(highestPriceListings);
				break;
			default:
				setListingToRender(listings || []);
				break;
		}
	};

	/*** Effects ***/
	useEffect(() => {
		if (listings) setListingToRender(listings);
	}, [listings]);

	/*** Return statement ***/
	if (isLoading) return <Skeletons />;
	if (error) return <AlertBox text={error} />;

	return (
		<>
			<title>{generatePageTitle("Properties for sale")}</title>
			<Container size="lg" mx="auto" my="xl">
				<Flex py="sm" justify="space-between" align="center">
					<BreadCrumb items={breadcrumbItems} />
					<Select
						onChange={handleOnChange}
						placeholder="Sort By"
						value={value}
						data={[
							{ value: "newest", label: "Newest" },
							{ value: "oldest", label: "Oldest" },
							{ value: "lowestPrice", label: "Lowest Price" },
							{ value: "highestPrice", label: "Highest Price" },
						]}
					/>
				</Flex>
				<Listings listings={listingToRender} />
			</Container>
		</>
	);
};
export default ForSale;
