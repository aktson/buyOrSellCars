"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { authenticate } from "@/functions/authenticate";
import { Card } from "@/components/common/Card";
import { Container, Stepper, Stack } from "@mantine/core";
import dynamic from "next/dynamic";
import { generatePageTitle } from "@/functions/functions";
import { AddPropertyFacilities } from "@/components/addPropertyForms/AddPropertyFacilities";
import { AddPropertyImages } from "@/components/addPropertyForms/AddPropertyImages";
import { AddPropertyInfo } from "@/components/addPropertyForms/AddPropertyInfo";
import { Summary } from "@/components/addPropertyForms/Summary";
import { usePropertyFormData } from "@/store/propertyFormStore";

/***** COMPONENT-FUNCTION *****/
const CreateNew: FC = (): JSX.Element => {
	/*** Variables */

	const currentIndex = usePropertyFormData((state) => state.currentIndex) || 0;
	const formSteps = [<AddPropertyInfo key={1} />, <AddPropertyFacilities key={2} />, <AddPropertyImages key={3} />, <Summary key={4} />];

	/*** Return statement ***/
	return (
		<>
			<title>{generatePageTitle("Create new listing")}</title>
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
				</Card>
			</Container>
		</>
	);
};

export default dynamic(() => Promise.resolve(authenticate(CreateNew)), { ssr: false });
