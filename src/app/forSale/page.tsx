"use client";
/***** IMPORTS *****/
import { Listings } from "@/components/listings/Listings";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Container, Flex, Select } from "@mantine/core";
import React, { FC, useEffect, useState } from "react";
import { IListings } from "@/types/types";
import { useListings } from "@/context/ListingsContext";

/***** COMPONENT-FUNCTION *****/
const ForSale: FC = (): JSX.Element => {
	/*** States */
	const [value, setValue] = useState<string | null>(null);
	const [listingToRender, setListingToRender] = useState<IListings[] | []>([]);

	// render breadcrumbItems
	const breadcrumbItems = [
		{ title: "Home", href: "/" },
		{ title: "Properties for sale", href: "/forSale" },
	];

	/*** VAriables */
	const { listings } = useListings();
	const listingForSale = listings?.filter((item: IListings) => item.data.type === "sale");
	// render breadcrumbItems

	/*** Effects */
	useEffect(() => {
		if (listingForSale) setListingToRender(listingForSale);
	}, [listings]);

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
				setListingToRender(listingForSale);
				break;
		}
	};

	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			<Flex px="sm" justify="space-between" align="center">
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
	);
};
export default ForSale;
