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
}

const useStyles = createStyles((theme) => ({
	activeButton: {
		pointerEvents: "none",
	},
}));

/***** COMPONENT-FUNCTION *****/
export const NavButton: FC<NavButtonProps> = ({ icon, href, children }): JSX.Element => {
	const pathname = usePathname();
	const theme = useMantineTheme();
	const { classes } = useStyles();

	/*** Return statement ***/
	return (
		<Button
			leftIcon={icon}
			color={pathname === href ? "indigo" : `${theme.colorScheme === "dark" ? "gray.3" : "gray"}`}
			variant="subtle"
			className={pathname === href ? classes.activeButton : ""}
			size="xs">
			<Link href={href}> {children}</Link>
		</Button>
	);
};
