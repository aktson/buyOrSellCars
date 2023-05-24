"use client";
/***** IMPORTS *****/
import { authenticate } from "@/components/authenticate";
import { Card } from "@/components/common/Card";
import { Container, Stepper, Stack, LoadingOverlay } from "@mantine/core";
import dynamic from "next/dynamic";
import React, { FC, useState } from "react";
import { IListings } from "@/types/types";
import { useMultiStepForm } from "@/context/MultiStepFormContext";

/***** TYPES *****/
interface CreateNewProps {}

const INITIAL_FORMDATA: Partial<IListings> = {
	title: "",
	description: "",
	city: "",
	address: "",
	bathrooms: 0,
	bedrooms: 0,
	imgUrls: [],
	price: "",
	userRef: "",
	type: "",
	furnished: false,
	parking: false,
};

/***** COMPONENT-FUNCTION *****/
const CreateNew: FC<CreateNewProps> = (): JSX.Element => {
	/*** States */
	const [isSubmitting, setIsSubmitting] = useState(false);

	/*** Variables */
	const { formData, formSteps, currentIndex } = useMultiStepForm();

	const handleFormSubmit = (data: any) => {
		console.log(data);
	};

	/*** Return statement ***/
	return (
		<Container size="md" my="xl" mx="auto">
			<Card width="100%" mx="auto">
				<Stack>
					<Stepper active={currentIndex + 1} breakpoint="sm" p="sm" size="sm" iconSize={28}>
						<Stepper.Step label="Property Details" />
						<Stepper.Step label="Facilities " />
						<Stepper.Step label="Images" />
						<Stepper.Step label="Summary" />
					</Stepper>
					{formSteps.map((step, index) => (
						<React.Fragment key={step.key}>{index === currentIndex && step}</React.Fragment>
					))}
				</Stack>
				<LoadingOverlay visible={isSubmitting} overlayBlur={1} />
			</Card>
		</Container>
	);
};

export default dynamic(() => Promise.resolve(authenticate(CreateNew)), { ssr: false });
