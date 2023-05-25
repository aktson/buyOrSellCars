"use client";
/***** IMPORTS *****/
import { authenticate } from "@/components/authenticate";
import { Card } from "@/components/common/Card";
import { Container, Stepper, Stack } from "@mantine/core";
import dynamic from "next/dynamic";
import React, { FC } from "react";
import { useMultiStepForm } from "@/context/MultiStepFormContext";

/***** COMPONENT-FUNCTION *****/
const CreateNew: FC = (): JSX.Element => {
	/*** Variables */
	const { formSteps, currentIndex } = useMultiStepForm();

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
			</Card>
		</Container>
	);
};

export default dynamic(() => Promise.resolve(authenticate(CreateNew)), { ssr: false });
