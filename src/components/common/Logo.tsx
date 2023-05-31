/***** IMPORTS *****/
import Link from "next/link";
import { Flex, Text } from "@mantine/core";
import React, { FC } from "react";
import { MdApi } from "react-icons/md";

/***** TYPES *****/
interface LogoProps {
	component?: any;
}

/***** COMPONENT-FUNCTION *****/
export const Logo: FC<LogoProps> = ({ component }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Link href="/">
			<Flex align="center">
				<MdApi size={22} fill="red" />
				<Text variant="gradient" component={component}>
					TRADE
				</Text>
			</Flex>
		</Link>
	);
};
