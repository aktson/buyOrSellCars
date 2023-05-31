"use client";
/***** IMPORTS *****/
import { Container, Flex, Text, useMantineTheme } from "@mantine/core";
import React, { FC } from "react";
import { MdCopyright } from "react-icons/md";
import { Logo } from "../common/Logo";
import { ULink } from "../common/ULink";

/***** TYPES *****/
interface FooterProps {}

/***** COMPONENT-FUNCTION *****/
export const Footer: FC<FooterProps> = (): JSX.Element => {
	/***Variables */
	const theme = useMantineTheme();
	/*** Return statement ***/
	return (
		<footer style={{ borderTop: `0.5px solid ${theme.colorScheme === "dark" ? `${theme.colors.dark[5]}` : `${theme.colors.gray[3]}`}` }}>
			<Container size="lg">
				<Flex justify="space-between" p="md">
					<Logo component="p" />
					<Flex>
						<Text variant="p" size="sm">
							<MdCopyright /> 2023 Designed & Developed by
						</Text>
						<ULink href="https://ankitsoni.dev/" target="_blank" rel="noreferrer">
							ANKSON
						</ULink>
					</Flex>
				</Flex>
			</Container>
		</footer>
	);
};
