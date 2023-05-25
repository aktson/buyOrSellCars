/***** IMPORTS *****/
import Link from "next/link";
import { Text } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface LogoProps {
	component?: any;
}

/***** COMPONENT-FUNCTION *****/
export const Logo: FC<LogoProps> = ({ component }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Link href="/">
			<Text variant="gradient" component={component}>
				TRADE
			</Text>
		</Link>
	);
};
