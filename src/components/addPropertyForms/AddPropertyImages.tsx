/***** IMPORTS *****/
import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { useMultiStepForm } from "@/context/MultiStepFormContext";
import { ActionIcon, Button, FileInput, Flex, Stack } from "@mantine/core";
import { MdChevronLeft, MdChevronRight, MdDelete, MdFileUpload } from "react-icons/md";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";
import { serverTimestamp } from "firebase/firestore";

/***** TYPES *****/
interface AddPropertyImagesProps {}

/***** COMPONENT-FUNCTION *****/
export const AddPropertyImages: FC<AddPropertyImagesProps> = (): JSX.Element => {
	/*** States */
	const [images, setImages] = useState<File[]>([]);

	const imageInputRef = useRef<HTMLButtonElement>(null);

	/*** Variables */
	const { prevStep, nextStep, formData, setFormData } = useMultiStepForm();

	/*** Functions */

	//Store image in firebase
	const storeImage = async (image: any) => {
		return new Promise((resolve, reject) => {
			const fileName = `${auth?.currentUser?.uid}-name=${image.name}-${uuidv4()}`;

			const storageRef = ref(storage, "images/" + fileName);

			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					console.log("uploadTask", error);
					reject(error);
				},
				() => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
						notifications.show({ message: "Images successfully uploaded", color: "green" });
					});
				}
			);
		});
	};

	/** Keeps previous states and Updates fields onChange, goes to nextstep
	 * @param {fields} <IListings> fields
	 * @return {void}
	 */
	const handleImageUpload = async () => {
		const newImgUrls = (await Promise.all([...images].map((image) => storeImage(image))).catch(() => {
			notifications.show({ message: "Images could not be uploaded", color: "red" });
			return;
		})) as string[];

		if (newImgUrls) {
			setFormData({
				...formData,
				imgUrls: [...(formData?.imgUrls || []), ...newImgUrls],
				timestamp: serverTimestamp() as any,
				userRef: auth?.currentUser?.uid,
			});
		}
	};

	const handleImageDelete = (image: string) => {
		const filterImgUrls = formData?.imgUrls?.filter((img) => img !== image);
		setFormData({ ...formData, imgUrls: filterImgUrls });
	};

	/*** Return statement ***/
	return (
		<Stack spacing="md">
			<Stack>
				<FileInput
					label="Images"
					placeholder="Add image or multiple images"
					accept="image/png,image/jpeg"
					value={images}
					onChange={setImages}
					multiple
					ref={imageInputRef}
					clearable
				/>
				<Flex>
					<Button type="submit" rightIcon={<MdFileUpload size={18} />} onClick={handleImageUpload} color="dark">
						Add
					</Button>
				</Flex>
			</Stack>
			<Flex gap="md" wrap="wrap">
				{formData?.imgUrls?.map((image) => {
					return (
						<figure key={image} style={{ position: "relative", boxShadow: "2px 2px 16px rgba(0,0,0,0.2)" }}>
							<Image src={image} alt={"just a image"} width={150} height={150} />
							<ActionIcon
								sx={{ position: "absolute", top: "0.2em", right: "0.2em" }}
								variant="light"
								color="gray"
								onClick={() => handleImageDelete(image)}>
								<MdDelete size={16} />
							</ActionIcon>
						</figure>
					);
				})}
			</Flex>
			<Flex justify="flex-end" gap="sm">
				<Button type="button" onClick={() => prevStep()} leftIcon={<MdChevronLeft size={18} />}>
					Previous
				</Button>

				<Button rightIcon={<MdChevronRight size={18} />} onClick={() => nextStep()} disabled={formData?.imgUrls?.length === 0}>
					Next
				</Button>
			</Flex>
		</Stack>
	);
};
