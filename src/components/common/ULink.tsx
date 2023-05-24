/***** IMPORTS *****/
import { NavLink } from "@mantine/core";
import Link from "next/link";
import React, { CSSProperties, FC } from "react";

/***** TYPES *****/
interface ULinkProps {
	children: React.ReactNode;
	icon?: JSX.Element;
	color?: string;
	href: string;
	styles?: CSSProperties;
}

/***** COMPONENT-FUNCTION *****/
export const ULink: FC<ULinkProps> = ({ children, icon, color, href, styles }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Link href={href}>
			<NavLink
				label={children}
				icon={icon}
				color={color ? color : "indigo"}
				variant="subtle"
				style={styles}
				sx={{ width: "max-content", display: "inline-flex", padding: "0", paddingLeft: "0.2em", color: "indigo" }}></NavLink>
		</Link>
	);
};
