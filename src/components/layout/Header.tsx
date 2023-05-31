"use client";
/***** IMPORTS *****/
import { Burger, Container, Divider, Drawer, Group, ScrollArea, Stack, createStyles, rem, Box, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FC } from "react";
import { Nav } from "./Nav";
import dynamic from "next/dynamic";
import { Logo } from "../common/Logo";

/***** TYPES *****/
interface HeaderProps {}

const useStyles = createStyles((theme) => ({
	dropdownFooter: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
		margin: `calc(${theme.spacing.md} * -1)`,
		marginTop: theme.spacing.sm,
		padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
		paddingBottom: theme.spacing.xl,
		borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]}`,
	},

	hiddenMobile: {
		[theme.fn.smallerThan("sm")]: {
			display: "none",
		},
	},

	hiddenDesktop: {
		[theme.fn.largerThan("sm")]: {
			display: "none",
		},
	},
}));

/***** COMPONENT-FUNCTION *****/
const Header: FC<HeaderProps> = (): JSX.Element => {
	/*** Variables ***/
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const { classes, theme } = useStyles();

	/** return statement */
	return (
		<Box component="header" sx={{ boxShadow: theme.colorScheme === "dark" ? `0px 2px 8px ${theme.colors.dark[5]}` : theme.shadows.xs }}>
			<Container size="lg">
				<Group position="apart" p="sm" align="center">
					<Logo component="h1" />
					<Group spacing={16} className={classes.hiddenMobile}>
						<Nav />
					</Group>
					<Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
				</Group>

				<Drawer
					opened={drawerOpened}
					onClose={closeDrawer}
					size="100%"
					padding="md"
					title="Navigation"
					className={classes.hiddenDesktop}
					zIndex={9999}>
					<ScrollArea h={`calc(100vh - ${rem(60)})`}>
						<Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />
						<Stack align="center">
							<Nav closeDrawer={closeDrawer} />
						</Stack>
					</ScrollArea>
				</Drawer>
			</Container>
		</Box>
	);
};
export default dynamic(() => Promise.resolve(Header), { ssr: false });
