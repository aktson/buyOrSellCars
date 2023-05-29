"use client";
/***** IMPORTS *****/
import { ListingItem } from "@/components/ListingItem";
import { authenticate } from "@/components/authenticate";
import { Card } from "@/components/common/Card";
import { RowFlexBox } from "@/components/common/FlexBox/RowFlexBox";
import { UpdateAvatar } from "@/components/editProfile/UpdateAvatar";
import { useAuth } from "@/context/AuthContext";
import { useListings } from "@/context/ListingsContext";
import { auth, db } from "@firebaseConfig";
import { ActionIcon, Avatar, Box, Button, Container, FileButton, FileInput, Stack, TextInput, Text, Flex, Grid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { FC, useState } from "react";
import { MdAddCircle, MdCheck, MdEdit, MdFileUpload } from "react-icons/md";

/***** TYPES *****/
interface ProfileProps {}

/***** COMPONENT-FUNCTION *****/
export const Profile: FC<ProfileProps> = (): JSX.Element => {
	/*** Variables */
	const auth = getAuth();
	const { currentUser } = useAuth();
	const { listings } = useListings();
	const filterListings = listings?.filter((listing) => listing.data.userRef === auth.currentUser?.uid);

	/*** States */
	const [changeDetails, setChangeDetails] = React.useState<boolean>(false);
	const [formData, setFormData] = React.useState({
		name: currentUser?.displayName,
		email: currentUser?.email,
	});

	/*** Functions ***/

	/** Sets formdata onchange event
	 * @param {event}
	 * @return {void}
	 */
	const handleInputChange = (event: React.ChangeEvent) => {
		const target = event.target as HTMLInputElement;

		setFormData((prevState) => ({
			...prevState,
			[target.id]: target.value,
		}));
	};

	/** Form submit event
	 * @param {event}
	 * @return {void}
	 */
	const handleSubmit = async () => {
		try {
			if (auth?.currentUser?.displayName !== formData.name) {
				// update displayName in firebase
				await updateProfile(auth?.currentUser as any, {
					displayName: formData.name,
				});
				// update in firestore
				const userRef = doc(db, "users", auth?.currentUser?.uid || "");
				await updateDoc(userRef, {
					name: formData.name,
				});
				notifications.show({ message: "Name updated", color: "green" });
			}
		} catch (error) {
			console.log(error);

			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
				console.log(error);
			} else {
				notifications.show({ message: "Coud not update profile details", color: "red" });
				console.log(error);
			}
		}
	};

	/*** Return statement ***/
	return (
		<Container size="lg" my="xl">
			<Stack>
				<h1>My Profile</h1>
				<Card width="700px">
					<RowFlexBox>
						<UpdateAvatar />
						<form onSubmit={handleSubmit} style={{ width: "100%" }}>
							<Stack mt="xl">
								<div style={{ position: "relative" }}>
									<TextInput
										id="name"
										radius="md"
										sx={{ width: "100%" }}
										defaultValue={formData.name || ""}
										onChange={handleInputChange}
										disabled={!changeDetails}
									/>
									<ActionIcon
										variant="subtle"
										color="gray"
										sx={{ position: "absolute", right: 4, top: 4 }}
										onClick={() => {
											changeDetails && handleSubmit();
											setChangeDetails((prevState) => !prevState);
										}}>
										{!changeDetails ? <MdEdit size={20} /> : <MdCheck size={20} />}
									</ActionIcon>
								</div>
								<TextInput id="email" radius="md" defaultValue={formData.email || ""} disabled />
							</Stack>
						</form>
					</RowFlexBox>
				</Card>
			</Stack>
			<Stack my="xl">
				<h2>My Listings</h2>

				{filterListings?.length === 0 ? (
					<Card width="500px">
						<p>No listings Found</p>
					</Card>
				) : (
					<Grid grow>
						{filterListings?.map((item) => {
							return (
								<Grid.Col span={4} key={item.id}>
									<ListingItem item={item} />
								</Grid.Col>
							);
						})}
					</Grid>
				)}
			</Stack>
		</Container>
	);
};

export default dynamic(() => Promise.resolve(authenticate(Profile)), { ssr: false });
