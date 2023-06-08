"use client";
/***** IMPORTS *****/
import React, { FC, useEffect } from "react";
import { Badge, Button, Container, Divider, Flex, Grid, Stack, Text } from "@mantine/core";
import { auth } from "@firebaseConfig";
import { IListings } from "@/types/types";
import { ShareButton } from "@/components/common/ShareButton";
import { ImageSlider } from "@/components/common/ImageSlider";
import { capitalize, convertPrice, generatePageTitle } from "@/functions/functions";
import { FavouriteButton } from "@/components/common/FavouriteButton";
import { MdBathroom, MdOutlineBedroomChild, MdLocalParking, MdChair } from "react-icons/md";
import Link from "next/link";
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { useSingleListingQuery } from "@/hooks/listingHooks/useSingleListingQuery";
import { Loading } from "@/components/common/Loading";
import { AlertBox } from "@/components/common/AlertBox";
import { useRouter } from "next/navigation";

/***** TYPES *****/
interface ListingSpecificProps {
	params: { id: string };
}

/***** COMPONENT-FUNCTION *****/
const ListingSpecific: FC<ListingSpecificProps> = ({ params }): JSX.Element => {
	/*** Variables */
	const { id } = params;
	const router = useRouter();
	const { listing, isLoading, error } = useSingleListingQuery(id);

	// render breadcrumbItems
	const breadcrumbItems = [
		{ title: "Home", href: "/" },
		{ title: `Properties for ${listing?.type === "rent" ? "rent" : "sale"}`, href: `${listing?.type === "rent" ? "/forRent" : "/forSale"}` },
		{ title: listing?.title, href: "#" },
	];

	/***Effects */
	useEffect(() => {
		if (!id) router.push("/");
	}, [id, router]);

	/*** Return statement ***/
	if (!listing) return <AlertBox text={"No listing found"} />;
	if (isLoading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<>
			<title>{generatePageTitle(`${listing?.title}`)}</title>
			<Container size="md" mx="auto" my="xl">
				<BreadCrumb items={breadcrumbItems} style={{ marginBottom: "0.5em" }} />

				{/* image slider  */}
				<ImageSlider imgUrls={listing?.imgUrls} />

				{/* favourite and share button */}
				<Flex mt="2em" justify="space-between" align="flex-end">
					<Badge sx={{ maxWidth: "max-content" }} size="xl">
						{listing?.type === "rent" ? "For rent" : "For sale"}
					</Badge>
					<Flex gap="md">
						<FavouriteButton style={{ padding: "1em" }} variant="outline" color="gray" text={true} listingId={id} />
						<ShareButton />
					</Flex>
				</Flex>

				{/* title and price of property */}
				<Stack mt="xs" spacing={0}>
					<Text size="3rem">{listing?.title}</Text>
					<Text>
						{capitalize(listing?.address)}, {capitalize(listing?.city)}
					</Text>
				</Stack>
				<Flex justify="space-between" mt="md">
					<Text size="2rem">
						NOK {convertPrice(listing?.price)},- {listing?.type === "rent" && " " + "/ month"}
					</Text>
					{auth?.currentUser?.uid !== listing?.userRef && (
						<Link href={`/contact/${listing?.userRef}?listingName=${listing?.title}&listingLocation=${listing?.location}`}>
							<Button>Contact</Button>
						</Link>
					)}
				</Flex>
				{/* facilities */}
				<Stack mt="3em">
					<Text size="xl" fw={500}>
						Facilities
					</Text>
					<Divider />
					<Grid style={{ maxWidth: "500px" }} gutter="xl">
						<Grid.Col span={6}>
							<Flex justify="space-between">
								<Flex gap="xs">
									<MdBathroom size={18} />
									Bathrooms
								</Flex>
								<Text fw="bold">{listing?.bathrooms}</Text>
							</Flex>
						</Grid.Col>
						<Grid.Col span={6}>
							<Flex justify="space-between">
								<Flex gap="xs">
									<MdOutlineBedroomChild />
									Bedrooms
								</Flex>
								<Text fw="bold">{listing?.bedrooms}</Text>
							</Flex>
						</Grid.Col>
						<Grid.Col span={6}>
							<Flex justify="space-between">
								<Flex gap="xs">
									<MdChair size={18} />
									Furnished
								</Flex>
								<Text fw="bold">{listing?.furnished ? "Yes" : "No"}</Text>
							</Flex>
						</Grid.Col>
						<Grid.Col span={6}>
							<Flex justify="space-between">
								<Flex gap="xs">
									<MdLocalParking size={18} />
									Parking
								</Flex>
								<Text fw="bold">{listing?.parking ? "Yes" : "No"}</Text>
							</Flex>
						</Grid.Col>
					</Grid>
				</Stack>

				{/* description of property */}
				<Stack mt="3em">
					<Text size="xl" fw={500}>
						About Property
					</Text>
					<Divider />
					<p>{listing?.description}</p>
				</Stack>
			</Container>
		</>
	);
};

export default ListingSpecific;
