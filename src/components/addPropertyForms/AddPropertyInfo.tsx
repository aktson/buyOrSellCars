/***** IMPORTS *****/
import { useMultiStepForm } from "@/context/MultiStepFormContext";
import { propertyInfo } from "@/yup/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, NativeSelect, Stack, TextInput, Textarea } from "@mantine/core";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { MdChevronRight } from "react-icons/md";
import { RowFlexBox } from "../common/FlexBox/RowFlexBox";

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
				<RowFlexBox>
					<NativeSelect
						{...register("type")}
						label="Type"
						placeholder="Select type of Property"
						sx={{ width: "100%" }}
						defaultValue={formData?.type || ""}
						data={[
							{ value: "rent", label: "For Rent" },
							{ value: "sale", label: "For Sale" },
						]}
						withAsterisk
					/>

					<TextInput
						{...register("title")}
						label="Heading"
						sx={{ width: "100%" }}
						placeholder="Add advertisement headline"
						defaultValue={formData?.title}
						radius="md"
						withAsterisk
						error={errors?.title && (errors.title.message as string)}
					/>
				</RowFlexBox>
				<Textarea
					{...register("description")}
					label="Description"
					placeholder="Add description of property"
					defaultValue={formData?.description}
					radius="md"
					minRows={6}
					withAsterisk
					error={errors?.description && (errors.description.message as string)}
				/>
				<RowFlexBox>
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
						sx={{ base: { width: "100%" }, sm: { width: "50%" } }}
						withAsterisk
						error={errors?.city && (errors.city.message as string)}
					/>
				</RowFlexBox>
				<RowFlexBox justify="flex-end">
					<Button type="submit" rightIcon={<MdChevronRight size={18} />}>
						Next
					</Button>
				</RowFlexBox>
			</Stack>
		</form>
	);
};
