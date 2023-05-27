/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { capitalize } from "@/functions/functions";
import { IListings } from "@/types/types";
import { Paper, Text, Stack, Badge, useMantineTheme, ActionIcon, Box, Flex, Modal, LoadingOverlay } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { FavouriteButton } from "./common/FavouriteButton";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { auth, db } from "@firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { useDisclosure } from "@mantine/hooks";
import { EditProperty } from "./EditProperty";
import { UImage } from "./common/UImage";

/***** TYPES *****/
interface ListingItemProps {
	item?: IListings;
}

/***** COMPONENT-FUNCTION *****/
export const ListingItem: FC<ListingItemProps> = ({ item }): JSX.Element => {
	/***States */
	const [isSubmitting, setIsSubmitting] = useState(false);

	/*** Variables ***/
	const theme = useMantineTheme();
	const { title, imgUrls, price, city, type, address } = item?.data!;
	const convertedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	const isAdmin = auth.currentUser?.uid === item?.data.userRef;
	const [opened, { open, close }] = useDisclosure(false);

	/*** Functions */
	/** Deletes listing
	 * @param {id} id of listing
	 * @return {void}
	 */
	const handleDeleteListing = async (id: string) => {
		setIsSubmitting(true);
		let confirm = window.confirm("Are you sure you want to Delete?");

		if (confirm) {
			try {
				const response = await deleteDoc(doc(db, "listings", id));
				console.log(response);
			} catch (error) {
				if (error instanceof FirebaseError) {
					notifications.show({ message: error.message, color: "red" });
					console.log(error);
				} else {
					notifications.show({ message: "An error occurred", color: "red" });
					console.log(error);
				}
			} finally {
				setIsSubmitting(false);
			}
		}
	};
	/*** Return statement ***/
	return (
		<Paper
			sx={{
				boxShadow: theme.colorScheme === "dark" ? `2px 2px 0px ${theme.colors.dark[6]}` : theme.shadows.xs,
				borderRadius: theme.radius.md,
			}}>
			<figure style={{ width: "100%", height: "200px", position: "relative" }}>
				<Link href={`/listingSpecific/${item?.id}`}>
					<UImage
						src={imgUrls?.[0] || ""}
						alt="No way!"
						style={{ borderTopLeftRadius: theme.radius.md, borderTopRightRadius: theme.radius.md }}
					/>
				</Link>
				<FavouriteButton style={{ position: "absolute", top: "1rem", right: "1rem" }} listingId={item?.id || ""} />
			</figure>

			<Stack p="md" spacing={0} sx={{ position: "relative" }}>
				<Badge sx={{ width: "max-content" }}>{type === "rent" ? "For rent" : "For sale"}</Badge>

				<Text weight={500} size="lg" my={4}>
					{capitalize(title)}
				</Text>
				{isAdmin && (
					<Box sx={{ position: "absolute", top: "1em", right: "1em" }}>
						<Flex gap="xs">
							<ActionIcon variant="light" onClick={() => handleDeleteListing(item?.id || "")}>
								<MdDelete size={16} />
							</ActionIcon>
							<ActionIcon variant="light" onClick={open}>
								<MdModeEdit size={16} />
							</ActionIcon>
						</Flex>
					</Box>
				)}
				<Text color="dimmed">
					{capitalize(address)}, {capitalize(city)}
				</Text>

				<Text color="indigo" mt={8}>
					NOK {convertedPrice},- {type === "rent" && " " + "/ month"}
				</Text>
			</Stack>

			<Modal
				opened={opened}
				onClose={close}
				title="Edit Property"
				centered
				size="xl"
				styles={{ title: { fontWeight: "bold", fontSize: "1.2em" } }}>
				<EditProperty listingId={item?.id || ""} />
			</Modal>
			<LoadingOverlay visible={isSubmitting} overlayBlur={1} />
		</Paper>
	);
};
