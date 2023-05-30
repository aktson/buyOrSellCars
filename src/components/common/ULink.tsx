/***** IMPORTS *****/
import { Button } from "@mantine/core";
import Link from "next/link";
import React, { CSSProperties, FC } from "react";

/***** TYPES *****/
interface ULinkProps {
	children: React.ReactNode;
	icon?: JSX.Element;
	color?: string;
	href: string;
	style?: CSSProperties;
	rightIcon?: JSX.Element;
}

/***** COMPONENT-FUNCTION *****/
export const ULink: FC<ULinkProps> = ({ children, icon, href, style, rightIcon }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Button size="xs" color="indigo" variant="subtle" compact leftIcon={icon} style={style} rightIcon={rightIcon}>
			<Link href={href}>{children}</Link>
		</Button>
	);
};
