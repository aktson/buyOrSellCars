"use client";
import { authenticate } from "@/components/authenticate";
/***** IMPORTS *****/
import { Card } from "@/components/common/Card";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@firebaseConfig";
import { ActionIcon, Container, Flex, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import dynamic from "next/dynamic";
import React, { FC, useEffect } from "react";
import { MdBorderColor, MdCheck } from "react-icons/md";

/***** TYPES *****/
interface ProfileProps {}

/***** COMPONENT-FUNCTION *****/
export const Profile: FC<ProfileProps> = (): JSX.Element => {
	/*** Variables */
	const auth = getAuth();
	const { currentUser } = useAuth();

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
			<Card width="500px" mx="auto">
				<Flex justify="space-between" align="center">
					<h1>My Profile</h1>
					<ActionIcon
						variant="light"
						color="blue"
						onClick={() => {
							changeDetails && handleSubmit();
							setChangeDetails((prevState) => !prevState);
						}}>
						{!changeDetails ? <MdBorderColor size={20} /> : <MdCheck size={20} />}
					</ActionIcon>
				</Flex>
				<form onSubmit={handleSubmit}>
					<Stack mt="xl">
						<TextInput id="name" radius="md" defaultValue={formData.name || ""} onChange={handleInputChange} disabled={!changeDetails} />
						<TextInput id="email" radius="md" defaultValue={formData.email || ""} disabled />
					</Stack>
				</form>
			</Card>
		</Container>
	);
};

export default dynamic(() => Promise.resolve(authenticate(Profile)), { ssr: false });
