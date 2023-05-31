/***** IMPORTS *****/
import { Button, createStyles, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

/***** TYPES *****/
interface NavButtonProps {
	icon?: JSX.Element;
	href: string;
	children: React.ReactNode;
	component?: any;
}

/*** Styles */
const useStyles = createStyles({
	activeButton: {
		pointerEvents: "none",
	},
});

/***** COMPONENT-FUNCTION *****/
export const NavButton: FC<NavButtonProps> = ({ icon, href, children, component }): JSX.Element => {
	const pathname = usePathname();
	const theme = useMantineTheme();
	const { classes } = useStyles();

	/*** Return statement ***/
	return (
		<Link href={href} style={{ paddingTop: "0.5em", paddingBottom: "0.5em" }}>
			<Button
				component={component}
				leftIcon={icon}
				color={pathname === href ? "indigo" : `${theme.colorScheme === "dark" ? "gray.3" : "gray"}`}
				variant="subtle"
				className={pathname === href ? classes.activeButton : ""}
				size="xs">
				{children}
			</Button>
		</Link>
	);
};
