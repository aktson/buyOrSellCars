/***** IMPORTS *****/
import React, { FC, useState } from "react";
import Image from "next/image";
import { ActionIcon, Button, FileInput, Flex, Stack } from "@mantine/core";
import { MdChevronLeft, MdChevronRight, MdDelete, MdFileUpload } from "react-icons/md";
import { auth, storage } from "@firebaseConfig";
import { notifications } from "@mantine/notifications";
import { serverTimestamp } from "firebase/firestore";
import { storeImageToFirebase } from "@/functions/storeImageToFirebase";
import { ref, deleteObject } from "firebase/storage";
import { usePropertyFormData } from "@/store/propertyFormStore";

/***** TYPES *****/
interface AddPropertyImagesProps {
	showButtons?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const AddPropertyImages: FC<AddPropertyImagesProps> = ({ showButtons = true }): JSX.Element => {
	/*** States */
	const [images, setImages] = useState<File[]>([]);

	/*** Variables */
	const { formData, nextStep, setFormData, prevStep } = usePropertyFormData((state) => ({
		formData: state.formData,
		nextStep: state.nextStep,
		setFormData: state.setFormData,
		prevStep: state.prevStep,
	}));

	/*** Functions */

	/** Keeps previous states and Updates fields onChange, goes to nextstep
	 * @param {fields} <IListings> fields
	 * @return {void}
	 */
	const handleImageUpload = async () => {
		const newImgUrls = (await Promise.all([...images].map((image) => storeImageToFirebase(image))).catch(() => {
			notifications.show({ message: "Images could not be uploaded", color: "red" });
			return;
		})) as string[];

		if (newImgUrls) {
			setFormData({
				imgUrls: [...(formData?.imgUrls || []), ...newImgUrls],
				timestamp: serverTimestamp(),
				userRef: auth?.currentUser?.uid,
			});
		}
	};

	const handleImageDelete = async (image: string) => {
		let confirm = window.confirm("Are you sure you want to delete?");
		if (confirm) {
			try {
				const decodedUrl = decodeURIComponent(image);
				const imageName = decodedUrl.substring(image.lastIndexOf("/") + 1, image.lastIndexOf("?"));
				const imgUrlToDelete = imageName.substring(imageName.lastIndexOf("/") + 1, imageName.lastIndexOf("?"));
				const imageRef = ref(storage, `images/${imgUrlToDelete}`);

				if (imageRef) {
					await deleteObject(imageRef);
					const filterImgUrls = formData?.imgUrls?.filter((img) => img !== image);
					setFormData({ imgUrls: filterImgUrls });
					setImages([]);

					notifications.show({ message: "Images deleted", color: "green" });
				}
			} catch (error) {
				console.log(error);
				notifications.show({ message: "Unknown error occured", color: "red" });
			}
		}
	};

	/*** Return statement ***/
	return (
		<Stack spacing="md">
			<Stack>
				<FileInput
					label="Images"
					placeholder="Add atleast an image or multiple images to continue"
					accept="image/png,image/jpeg"
					value={images}
					onChange={setImages}
					multiple
					clearable
				/>
				<Flex>
					<Button
						type="submit"
						rightIcon={<MdFileUpload size={18} />}
						onClick={handleImageUpload}
						color="dark"
						disabled={images.length < 1}>
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
			{showButtons && (
				<Flex justify="flex-end" gap="sm">
					<Button type="button" onClick={() => prevStep()} leftIcon={<MdChevronLeft size={18} />}>
						Previous
					</Button>

					<Button rightIcon={<MdChevronRight size={18} />} onClick={() => nextStep()} disabled={formData?.imgUrls?.length === 0}>
						Next
					</Button>
				</Flex>
			)}
		</Stack>
	);
};
