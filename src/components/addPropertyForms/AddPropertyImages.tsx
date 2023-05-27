/***** IMPORTS *****/
import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { useMultiStepForm } from "@/context/MultiStepFormContext";
import { ActionIcon, Button, FileInput, Flex, Stack } from "@mantine/core";
import { MdChevronLeft, MdChevronRight, MdDelete, MdFileUpload } from "react-icons/md";
import { auth } from "@firebaseConfig";
import { notifications } from "@mantine/notifications";
import { serverTimestamp } from "firebase/firestore";
import { storeImageToFirebase } from "@/functions/storeImageToFirebase";

/***** TYPES *****/
interface AddPropertyImagesProps {
	showButtons?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const AddPropertyImages: FC<AddPropertyImagesProps> = ({ showButtons = true }): JSX.Element => {
	/*** States */
	const [images, setImages] = useState<File[]>([]);

	const imageInputRef = useRef<HTMLButtonElement>(null);

	/*** Variables */
	const { prevStep, nextStep, formData, setFormData } = useMultiStepForm();

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
