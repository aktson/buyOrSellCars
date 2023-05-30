/***** IMPORTS *****/
import React, { FC, MouseEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/functions/functions";
import { ActionIcon, Avatar, Button, Flex, Menu, Paper, createStyles, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
	MdAccountCircle,
	MdFavorite,
	MdHome,
	MdKey,
	MdKeyboardArrowDown,
	MdLogin,
	MdLogout,
	MdLoyalty,
	MdOutlineAddCircleOutline,
	MdSell,
} from "react-icons/md";
import { auth } from "@firebaseConfig";
import path from "path";
import { ThemeToggler } from "../common/ThemeToggler";
import { UImage } from "../common/UImage";

/***** TYPES *****/
interface NavProps {
	closeDrawer?: MouseEventHandler<HTMLDivElement> | undefined;
}

const useStyles = createStyles((theme) => ({
	nav: {
		display: "flex",
		alignItems: "center",
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			gap: "1em",
		},
	},

	activeButton: {
		pointerEvents: "none",
	},
}));

/***** COMPONENT-FUNCTION *****/
export const Nav: FC<NavProps> = ({ closeDrawer }): JSX.Element => {
	/*** Variables***/
	const pathname = usePathname();
	const homePath = pathname === "/";
	const createNew = pathname === "/createNew";
	const signinPath = pathname === "/signin";
	const forSalePath = pathname === "/forSale";
	const forRentPath = pathname === "/forRent";
	const { classes } = useStyles();
	const { currentUser } = useAuth();
	const router = useRouter();

	const username = getInitials(currentUser?.displayName || "");
	const theme = useMantineTheme();

	/**
	 * Function that logs out user and redirects to home firstName and lastName from fullName
	 * @returns {void}
	 */
	const handleLogout = () => {
		auth.signOut();
		router.push("/");
	};
	console.log(currentUser?.photoURL);
	/**
	 * Function that check if path matches then makes color to blue else to gray
	 * @param {string} path pass string of path to match
	 * @returns {void}
	 */
	function getActivePath(path: string) {
		return pathname === path ? "indigo" : `${theme.colorScheme === "dark" ? "gray.3" : "gray"}`;
	}
	/*** Return statement ***/
	return (
		<nav onClick={closeDrawer} className={classes.nav}>
			<Button
				leftIcon={<MdHome size={20} />}
				color={getActivePath("/")}
				variant="subtle"
				className={homePath ? classes.activeButton : ""}
				size="xs">
				<Link href="/"> Home</Link>
			</Button>

			<Button
				size="xs"
				leftIcon={<MdSell size={20} />}
				color={getActivePath("/forSale")}
				variant="subtle"
				className={forSalePath ? classes.activeButton : ""}>
				<Link href="/forSale">For Sale</Link>
			</Button>
			<Button
				size="xs"
				leftIcon={<MdKey size={20} />}
				color={getActivePath("/forRent")}
				variant="subtle"
				className={forRentPath ? classes.activeButton : ""}>
				<Link href="/forRent">For Rent</Link>
			</Button>
			<Button
				size="xs"
				leftIcon={<MdOutlineAddCircleOutline size={20} />}
				color={getActivePath("/createNew")}
				variant="subtle"
				className={createNew ? classes.activeButton : ""}>
				<Link href="/createNew">Create New</Link>
			</Button>

			{currentUser && (
				<Menu shadow="md" width={200}>
					<Menu.Target>
						<Paper shadow="sm" radius="xl">
							<Flex align="center" sx={{ cursor: "pointer" }}>
								{currentUser?.photoURL ? (
									<Avatar
										src={currentUser?.photoURL}
										alt={currentUser.displayName || ""}
										radius="xl"
										sx={{ boxShadow: "2px 2px 16px rgba(0,0,0,0.5" }}
									/>
								) : (
									<Avatar color="indigo">{username}</Avatar>
								)}
								<ActionIcon size={36} color="indigo">
									<MdKeyboardArrowDown size={26} />
								</ActionIcon>
							</Flex>
						</Paper>
					</Menu.Target>
					<Menu.Dropdown>
						<Menu.Label>{currentUser.email}</Menu.Label>
						<Menu.Divider />
						<Menu.Item icon={<MdAccountCircle size={18} />} color={getActivePath("/profile")}>
							<Link href="/profile">My Profile</Link>
						</Menu.Item>
						<Menu.Item icon={<MdFavorite size={18} />} color={getActivePath("/favourite")}>
							<Link href="/favourite">Favourites</Link>
						</Menu.Item>

						<Menu.Divider />
						<Menu.Item icon={<MdLogout size={18} />} onClick={handleLogout} color="dimmed">
							Sign Out
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}

			{!currentUser && (
				<Button
					leftIcon={<MdLogin size={20} />}
					color={getActivePath("/signin")}
					variant="subtle"
					className={signinPath ? classes.activeButton : ""}>
					<Link href="/signin">Sign In</Link>
				</Button>
			)}
			<ThemeToggler />
		</nav>
	);
};
