/***** IMPORTS *****/
import { useMultiStepForm } from "@/context/MultiStepFormContext";
import { propertyInfo } from "@/yup/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, NativeSelect, Stack, TextInput, Textarea } from "@mantine/core";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { MdChevronRight } from "react-icons/md";

/***** TYPES *****/
interface AddPropertyInfoProps {
	nextStep?: () => void;
}

/***** COMPONENT-FUNCTION *****/
export const AddPropertyInfo: FC<AddPropertyInfoProps> = (): JSX.Element => {
	/*** Variables */

	const { formData, setFormData, nextStep } = useMultiStepForm();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(propertyInfo) });

	/*** Functions */
	/** Keeps previous states and Updates fields onChange, goes to nextstep
	 * @param {fields} <IListings> fields
	 * @return {void}
	 */
	const handleFormSubmit = async (data: any) => {
		setFormData({ ...formData, ...data });
		nextStep?.();
	};

	/*** Return statement ***/
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<Stack spacing="md">
				<NativeSelect
					{...register("type")}
					label="Type"
					placeholder="Select type of Property"
					defaultValue={formData?.type || ""}
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
					defaultValue={formData?.title}
					radius="md"
					withAsterisk
					error={errors?.title && (errors.title.message as string)}
				/>
				<Textarea
					{...register("description")}
					label="Description"
					placeholder="Add description of property"
					defaultValue={formData?.description}
					radius="md"
					withAsterisk
					error={errors?.description && (errors.description.message as string)}
				/>
				<Flex gap="md">
					<TextInput
						{...register("address")}
						label="Address"
						placeholder="Add address of property"
						defaultValue={formData?.address}
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
						defaultValue={formData?.city}
						sx={{ width: "50%" }}
						withAsterisk
						error={errors?.city && (errors.city.message as string)}
					/>
				</Flex>
				<Flex justify="flex-end">
					<Button type="submit" rightIcon={<MdChevronRight size={18} />}>
						Next
					</Button>
				</Flex>
			</Stack>
		</form>
	);
};
