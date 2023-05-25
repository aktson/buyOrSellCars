/***** IMPORTS *****/
import React, { FC } from "react";
import { capitalize } from "@/functions/functions";
import { IListings } from "@/types/types";
import { Paper, Text, Stack, Badge, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { FavouriteButton } from "./common/FavouriteButton";

/***** TYPES *****/
interface ListingItemProps {
	item?: IListings;
}

/***** COMPONENT-FUNCTION *****/
export const ListingItem: FC<ListingItemProps> = ({ item }): JSX.Element => {
	/*** Variables ***/
	const theme = useMantineTheme();
	const { title, imgUrls, price, city, type, address } = item?.data!;
	const convertedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	/*** Return statement ***/
	return (
		<Paper sx={{ boxShadow: theme.colorScheme === "dark" ? `2px 2px 0px ${theme.colors.dark[6]}` : theme.shadows.xs }}>
			<figure style={{ width: "100%", height: "200px", position: "relative" }}>
				<Link href={`/listingSpecific/${item?.id}`}>
					<Image src={imgUrls?.[0] || ""} alt="No way!" fill={true} style={{ objectFit: "cover" }} />
				</Link>
				<FavouriteButton style={{ position: "absolute", top: "1rem", right: "1rem" }} />
			</figure>

			<Stack p="md" spacing={0}>
				<Badge sx={{ width: "max-content" }}>{type === "rent" ? "For rent" : "For sale"}</Badge>

				<Text weight={500} size="lg" my={4}>
					{capitalize(title)}
				</Text>

				<Text color="dimmed">
					{capitalize(address)}, {capitalize(city)}
				</Text>

				<Text color="indigo" size="xl" mt={12}>
					NOK {convertedPrice},-
				</Text>
			</Stack>
		</Paper>
	);
};
