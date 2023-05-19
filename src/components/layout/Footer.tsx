"use client";
/***** IMPORTS *****/
import { Container, Flex, Text } from "@mantine/core";
import React, { FC } from "react";
import { MdCopyright } from "react-icons/md";

/***** TYPES *****/
interface FooterProps {}

/***** COMPONENT-FUNCTION *****/
export const Footer: FC<FooterProps> = (): JSX.Element => {
	/*** Return statement ***/
	return (
		<footer style={{ borderTop: "0.5px solid #D3D3D3" }}>
			<Container size="lg">
				<Flex justify="space-between" p="xl">
					<Text>LOGO</Text>
					<Text variant="p" size="sm">
						<MdCopyright /> 2023 Designed & Developed by AnkSon
					</Text>
				</Flex>
			</Container>
		</footer>
	);
};
