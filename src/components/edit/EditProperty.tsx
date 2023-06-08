/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { Accordion, Button, Divider, FileInput, Flex, LoadingOverlay, NativeSelect, Stack, Switch, TextInput, Textarea } from "@mantine/core";
import { RowFlexBox } from "../common/FlexBox/RowFlexBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editPropertySchema } from "@/yup/schema";
import { MdFileUpload } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { storeImageToFirebase } from "@/functions/storeImageToFirebase";
import { useEditListingMutation } from "@/hooks/listingHooks/useEditListingMutation";
import { useSingleListingQuery } from "@/hooks/listingHooks/useSingleListingQuery";
import { AlertBox } from "../common/AlertBox";
import { Loading } from "../common/Loading";

/***** TYPES *****/
interface EditPropertyProps {
	listingId: string;
	closeModal: () => void;
}

/***** COMPONENT-FUNCTION *****/
export const EditProperty: FC<EditPropertyProps> = ({ listingId, closeModal }): JSX.Element | null => {
	/*** States */
	const [images, setImages] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newImgUrls, setnewImgUrls] = useState<String[]>([]);

	/*** Variables */
	const editListingMutation = useEditListingMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(editPropertySchema) });
	const { listing, isLoading, error } = useSingleListingQuery(listingId);

	/*** Functions */

	/** updates listing
	 * @param {data} <IListings> data of listing
	 * @return {void}
	 */
	const handleFormSubmit = async (data: any) => {
		setIsSubmitting(true);

		try {
			const updatedData = { ...data, imgUrls: [...(listing?.imgUrls || []), ...newImgUrls] };
			await editListingMutation.mutateAsync({ listingId, updatedData });
			notifications.show({ message: "Successfully updated!", color: "green" });
			closeModal();
		} catch (error) {
			console.log(error);
			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
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
	if (!listing) return null;
	if (isLoading) return <Loading />;
	if (!listingId) return <p>No Listing found to update!</p>;
	if (error) return <AlertBox text={error} />;
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
									defaultValue={listing?.type}
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
									defaultValue={listing?.title}
									radius="md"
									withAsterisk
									error={errors?.title && (errors.title.message as string)}
								/>
							</RowFlexBox>
							<Textarea
								{...register("description")}
								label="Description"
								placeholder="Add description of property"
								defaultValue={listing?.description}
								radius="md"
								withAsterisk
								error={errors?.description && (errors.description.message as string)}
							/>
							<RowFlexBox>
								<TextInput
									{...register("address")}
									label="Address"
									placeholder="Add address of property"
									defaultValue={listing?.address}
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
									defaultValue={listing?.city}
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
									<Switch label="Parking" defaultChecked={listing?.parking} {...register("parking")} />
									<Switch label="Furnished" defaultChecked={listing?.furnished} {...register("furnished")} />
								</RowFlexBox>
								<TextInput
									{...register("price")}
									label="Price"
									placeholder="Add price of property"
									defaultValue={listing?.price}
									radius="md"
									sx={{ width: "100%" }}
									error={errors.price && (errors.price.message as string)}
								/>

								<RowFlexBox>
									<TextInput
										{...register("bedrooms")}
										defaultValue={listing?.bedrooms}
										label="Bedrooms"
										placeholder="Add number of bedrooms"
										radius="md"
										sx={{ width: "100%" }}
										error={errors.bedrooms && (errors.bedrooms.message as string)}
									/>
									<TextInput
										{...register("bathrooms")}
										defaultValue={listing?.bathrooms}
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
			<LoadingOverlay visible={isSubmitting || isLoading} overlayBlur={1} />
		</form>
	);
};
