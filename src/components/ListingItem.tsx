/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { capitalize } from "@/functions/functions";
import { IListings } from "@/types/types";
import { Paper, Text, Stack, ActionIcon, Chip } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FavouriteButton } from "./common/FavouriteButton";

/***** TYPES *****/
interface ListingItemProps {
	item?: { id: string; data?: IListings };
}

/***** COMPONENT-FUNCTION *****/
export const ListingItem: FC<ListingItemProps> = ({ item }): JSX.Element => {
	/*** States ***/
	const [isFavourite, setIsFavourite] = useState<boolean>(false);

	// console.log(item);
	const data = item?.data as IListings;

	const { title, imgUrls, price, description, city, type, address } = data;
	const convertedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	/*** Return statement ***/
	return (
		<Paper shadow="xs">
			<figure style={{ width: "100%", height: "200px", position: "relative" }}>
				<Link href={`/listingSpecific/${item?.id}`}>
					<Image src={imgUrls?.[0] || ""} alt="No way!" fill={true} style={{ objectFit: "cover" }} />
				</Link>
				<FavouriteButton style={{ position: "absolute", top: "1rem", right: "1rem" }} />
			</figure>

			<Stack p="xl" spacing={0}>
				<Chip variant="light" color="cyan">
					{type === "rent" ? "For Rent" : "For Sale"}
				</Chip>

				<Text weight={500} size="lg" my={4}>
					{capitalize(description)}
				</Text>

				<Text color="dimmed">
					{capitalize(address)}, {capitalize(city)}
				</Text>

				<Text color="cyan" size="xl" mt={12}>
					NOK {convertedPrice},-
				</Text>
			</Stack>
		</Paper>
	);
};
