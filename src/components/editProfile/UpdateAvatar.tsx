/***** IMPORTS *****/
import { storeImageToFirebase } from "@/functions/storeImageToFirebase";
import { auth, db } from "@firebaseConfig";
import { ActionIcon, Button, FileInput, Flex, Loader, Stack, Text, createStyles } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { FC, useState } from "react";
import { MdCancel, MdEdit, MdFileUpload } from "react-icons/md";
import ImageIcon from "public/addImage.png";
import { UImage } from "../common/UImage";

/***** Styles *****/
const useStyles = createStyles((theme) => ({
	fileInput: {
		position: "absolute",
		width: "100%",
		zIndex: 2,
	},

	cancelButton: {
		position: "absolute",
		top: "0.2em",
		right: "0.2em",
		zIndex: 4,
		cursor: "pointer",
		color: "white",
	},
	imageWrapper: {
		background: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[1],
		width: 150,
		height: 150,
		alignItems: "center",
		justifyContent: "center",
	},
}));

/***** COMPONENT-FUNCTION *****/
export const UpdateAvatar: FC = (): JSX.Element => {
	/*** States */
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [image, setImage] = useState<File | null>(null);
	const [photoUrl, setPhotoUrl] = useState(auth.currentUser?.photoURL);

	/*** Variables */
	const { classes } = useStyles();
	const file = image;
	const imageName = file?.name || null;

	/*** functions */
	const handleImageUpload = async () => {
		if (!image) return;
		setIsSubmitting(true);
		try {
			const imgUrl = (await storeImageToFirebase(image)) as string;

			// update photoUrl in firebase
			if (imgUrl) {
				await updateProfile(auth?.currentUser as any, {
					photoURL: imgUrl,
				});

				setPhotoUrl(imgUrl);
				setImage(null);
				// update in firestore
				const userRef = doc(db, "users", auth?.currentUser?.uid || "");
				await updateDoc(userRef, {
					photoUrl: imgUrl,
				});

				notifications.show({ message: "Image updated", color: "green" });
			}
		} catch (error) {
			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
				console.log(error);
			} else {
				notifications.show({ message: "Coud not update profile details", color: "red" });
				console.log(error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	/*** Return statement ***/
	return (
		<form>
			<Stack>
				<div style={{ position: "relative" }}>
					<FileInput
						className={classes.fileInput}
						onChange={setImage}
						accept="image/png,image/jpeg, image/jpg"
						icon={
							!image && (
								<ActionIcon variant="light" mt={24}>
									<MdEdit size={18} />
								</ActionIcon>
							)
						}
						label={imageName}
						styles={{
							input: { opacity: 0, top: 0, position: "absolute", height: "150px" },
							label: {
								opacity: `${image ? 1 : 0}`,
								color: "white",
								background: "rgba(0,0,0,0.6)",
								height: "150px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							},
						}}
					/>
					{image && (
						<Text className={classes.cancelButton} onClick={() => setImage(null)}>
							<MdCancel />
						</Text>
					)}

					<Flex className={classes.imageWrapper}>
						{isSubmitting ? <Loader /> : <UImage src={photoUrl ? photoUrl : ImageIcon} alt="add image" />}
					</Flex>
				</div>
				<Button
					color="dark"
					rightIcon={<MdFileUpload size={18} />}
					onClick={handleImageUpload}
					loading={isSubmitting}
					sx={{ zIndex: 10 }}
					disabled={!image}>
					upload
				</Button>
			</Stack>
		</form>
	);
};
