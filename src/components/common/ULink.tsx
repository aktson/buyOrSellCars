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
	target?: string;
	rel?: string;
}

/***** COMPONENT-FUNCTION *****/
export const ULink: FC<ULinkProps> = ({ children, icon, href, style, rightIcon, rel, target }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Button size="xs" color="indigo" variant="subtle" compact leftIcon={icon} style={style} rightIcon={rightIcon}>
			<Link href={href} target={target} rel={rel}>
				{children}
			</Link>
		</Button>
	);
};
