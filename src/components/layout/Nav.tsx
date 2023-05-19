/***** IMPORTS *****/
import React, { FC, MouseEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/functions/functions";
import { ActionIcon, Avatar, Button, Flex, Menu, Paper, createStyles } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { MdAccountCircle, MdFavorite, MdHome, MdKeyboardArrowDown, MdLogin, MdLogout, MdOutlineAddCircleOutline } from "react-icons/md";
import { auth } from "@firebaseConfig";
import path from "path";

/***** TYPES *****/
interface NavProps {
	closeDrawer?: MouseEventHandler<HTMLDivElement> | undefined;
}

const useStyles = createStyles((theme) => ({
	nav: {
		display: "flex",
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
	const { classes } = useStyles();
	const { currentUser } = useAuth();
	const router = useRouter();

	const username = getInitials(currentUser?.displayName || "");

	/**
	 * Function that logs out user and redirects to home firstName and lastName from fullName
	 * @returns {void}
	 */
	const handleLogout = () => {
		auth.signOut();
		router.push("/");
	};

	/**
	 * Function that check if path matches then makes color to blue else to gray
	 * @param {string} path pass string of path to match
	 * @returns {void}
	 */
	function getActivePath(path: string) {
		return pathname === path ? "blue" : "gray";
	}
	/*** Return statement ***/
	return (
		<nav onClick={closeDrawer} className={classes.nav}>
			<Button leftIcon={<MdHome size={20} />} color={getActivePath("/")} variant="subtle" className={homePath ? classes.activeButton : ""}>
				<Link href="/"> Home</Link>
			</Button>
			<Button
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
								<Avatar color="teal">{username || <MdAccountCircle size={18} />}</Avatar>
								<ActionIcon size={36} color="teal">
									<MdKeyboardArrowDown size={22} />
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
						<Menu.Item icon={<MdLogout size={18} />} onClick={handleLogout} color="gray">
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
		</nav>
	);
};
