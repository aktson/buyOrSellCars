/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { Accordion, Button, Divider, FileInput, Flex, LoadingOverlay, NativeSelect, Stack, Switch, TextInput, Textarea } from "@mantine/core";
import { RowFlexBox } from "./common/FlexBox/RowFlexBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPropertySchema } from "@/yup/schema";
import { useListings } from "@/context/ListingsContext";
import { IListings } from "@/types/types";
import { MdFileUpload } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { storeImageToFirebase } from "@/functions/storeImageToFirebase";

/***** TYPES *****/
interface EditPropertyProps {
	listingId: string;
}

/***** COMPONENT-FUNCTION *****/
export const EditProperty: FC<EditPropertyProps> = ({ listingId }): JSX.Element => {
	/*** States */
	const [images, setImages] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newImgUrls, setnewImgUrls] = useState<String[]>([]);

	/*** Variables */
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(editPropertySchema) });

	const { listings } = useListings();
	const router = useRouter();

	const listing = listings?.find((item) => item.id === listingId) as IListings;

	const handleFormSubmit = async (data: any) => {
		setIsSubmitting(true);

		try {
			const docRef = await doc(db, "listings", listingId);
			const updatedData = { ...data, imgUrls: [...(listing?.data?.imgUrls || []), ...newImgUrls] };
			await updateDoc(docRef, updatedData);
			notifications.show({ message: "Successfully updated!", color: "green" });
			router.push(`/listingSpecific/${listingId}`);
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
	};

	/** Keeps previous states and Updates fields onChange, goes to nextstep
	 * @param {fields} <IListings> fields
	 * @return {void}
	 */
	const handleImageUpload = async () => {
		const newImgUrls = (await Promise.all([...images].map((image) => storeImageToFirebase(image))).catch(() => {
			notifications.show({ message: "Images could not be uploaded", color: "red" });
			return;
		})) as string[];

		setnewImgUrls(newImgUrls);
	};

	if (!listingId) return <p>No Listing found to update!</p>;
	/*** Return statement ***/
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			{/* Property info */}
			<Accordion defaultValue="details" variant="filled">
				<Accordion.Item value="details">
					<Accordion.Control>Property Details</Accordion.Control>
					<Divider mx="md" />
					<Accordion.Panel mt="sm">
						<Stack spacing="sm">
							<RowFlexBox>
								<NativeSelect
									{...register("type")}
									label="Type"
									placeholder="Select type of Property"
									defaultValue={listing?.data.type || ""}
									sx={{ width: "100%" }}
									data={[
										{ value: "rent", label: "For Rent" },
										{ value: "sale", label: "For Sale" },
									]}
									withAsterisk
								/>

								<TextInput
									{...register("title")}
									label="Heading"
									placeholder="Add advertisement headline"
									sx={{ width: "100%" }}
									defaultValue={listing?.data.title}
									radius="md"
									withAsterisk
									error={errors?.title && (errors.title.message as string)}
								/>
							</RowFlexBox>
							<Textarea
								{...register("description")}
								label="Description"
								placeholder="Add description of property"
								defaultValue={listing?.data.description}
								radius="md"
								withAsterisk
								error={errors?.description && (errors.description.message as string)}
							/>
							<RowFlexBox>
								<TextInput
									{...register("address")}
									label="Address"
									placeholder="Add address of property"
									defaultValue={listing?.data.address}
									radius="md"
									sx={{ width: "100%" }}
									withAsterisk
									error={errors?.address && (errors.address.message as string)}
								/>
								<TextInput
									{...register("city")}
									label="City"
									placeholder="Add city of property"
									radius="md"
									defaultValue={listing?.data.city}
									sx={{ base: { width: "100%" }, sm: { width: "50%" } }}
									withAsterisk
									error={errors?.city && (errors.city.message as string)}
								/>
							</RowFlexBox>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>

				{/* facilities */}
				<Accordion.Item value="Facilities">
					<Accordion.Control>Facilities</Accordion.Control>
					<Divider mx="md" />
					<Accordion.Panel mt="sm">
						<Stack spacing="sm">
							<Stack spacing="md">
								<RowFlexBox columnOnSmall={false}>
									<Switch label="Parking" defaultChecked={listing?.data?.parking} {...register("parking")} />
									<Switch label="Furnished" defaultChecked={listing?.data?.furnished} {...register("furnished")} />
								</RowFlexBox>
								<TextInput
									{...register("price")}
									label="Price"
									placeholder="Add price of property"
									defaultValue={listing?.data?.price}
									radius="md"
									sx={{ width: "100%" }}
									error={errors.price && (errors.price.message as string)}
								/>

								<RowFlexBox>
									<TextInput
										{...register("bedrooms")}
										defaultValue={listing?.data?.bedrooms}
										label="Bedrooms"
										placeholder="Add number of bedrooms"
										radius="md"
										sx={{ width: "100%" }}
										error={errors.bedrooms && (errors.bedrooms.message as string)}
									/>
									<TextInput
										{...register("bathrooms")}
										defaultValue={listing?.data?.bathrooms}
										label="Bathrooms"
										placeholder="Add number of bathrooms"
										radius="md"
										sx={{ width: "100%" }}
										error={errors.bathrooms && (errors.bathrooms.message as string)}
									/>
								</RowFlexBox>
							</Stack>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>

				{/* images */}
				<Accordion.Item value="Images">
					<Accordion.Control>Images</Accordion.Control>
					<Divider mx="md" />
					<Accordion.Panel mt="sm">
						<Stack spacing="sm" my="xl">
							<FileInput
								label="Images"
								placeholder="Add image or multiple images"
								accept="image/png,image/jpeg"
								value={images}
								onChange={setImages}
								multiple
								clearable
							/>
							<Flex>
								<Button type="submit" rightIcon={<MdFileUpload size={18} />} onClick={handleImageUpload} color="dark">
									Add
								</Button>
							</Flex>
						</Stack>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
			<Flex justify="flex-end">
				<Button type="submit" mt="xl">
					Submit
				</Button>
			</Flex>
			<LoadingOverlay visible={isSubmitting} overlayBlur={1} />
		</form>
	);
};
