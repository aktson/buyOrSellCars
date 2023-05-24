/***** IMPORTS *****/
import { useMultiStepForm } from "@/context/MultiStepFormContext";
import { propertyFacilities } from "@/yup/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Stack, Switch, TextInput } from "@mantine/core";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

/***** COMPONENT-FUNCTION *****/
export const AddPropertyFacilities: FC = (): JSX.Element => {
	/*** Variables */
	const { prevStep, nextStep, formData, setFormData } = useMultiStepForm();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(propertyFacilities) });

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
				<Flex gap="md" align="center">
					<TextInput
						{...register("price")}
						label="Price"
						placeholder="Add price of property"
						defaultValue={formData?.price}
						radius="md"
						sx={{ width: "100%" }}
						error={errors.price && (errors.price.message as string)}
					/>
					<Switch {...register("parking")} label="Parking" defaultChecked={formData?.parking} />
					<Switch {...register("furnished")} label="Furnished" defaultChecked={formData?.furnished} />
				</Flex>

				<Flex gap="md">
					<TextInput
						{...register("bedrooms")}
						defaultValue={formData?.bedrooms}
						label="Bedrooms"
						placeholder="Add number of bedrooms"
						radius="md"
						sx={{ width: "100%" }}
						error={errors.bedrooms && (errors.bedrooms.message as string)}
					/>
					<TextInput
						{...register("bathrooms")}
						defaultValue={formData?.bathrooms}
						label="Bathrooms"
						placeholder="Add number of bathrooms"
						radius="md"
						sx={{ width: "100%" }}
						error={errors.bathrooms && (errors.bathrooms.message as string)}
					/>
				</Flex>

				<Flex justify="flex-end" gap="sm">
					<Button type="button" onClick={() => prevStep()} leftIcon={<MdChevronLeft size={18} />}>
						Previous
					</Button>
					<Button type="submit" rightIcon={<MdChevronRight size={18} />}>
						Next
					</Button>
				</Flex>
			</Stack>
		</form>
	);
};