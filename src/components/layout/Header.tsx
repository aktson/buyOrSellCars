"use client";
/***** IMPORTS *****/
import { Burger, Button, Container, Divider, Drawer, Group, ScrollArea, Stack, Text, createStyles, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import React, { FC } from "react";
import { Nav } from "./Nav";
import dynamic from "next/dynamic";

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
		<header style={{ boxShadow: "2px 2px 2px rgba(0,0,0,0.1)" }}>
			<Container size={"lg"}>
				<Group position="apart" sx={{ padding: "1em" }}>
					<Link href="/">
						<Text variant="gradient" component="h1">
							{" "}
							TRADE
						</Text>
					</Link>
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
		</header>
	);
};
export default dynamic(() => Promise.resolve(Header), { ssr: false });
