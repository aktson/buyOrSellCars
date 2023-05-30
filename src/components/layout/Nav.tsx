/***** IMPORTS *****/
import React, { FC, MouseEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/functions/functions";
import { ActionIcon, Avatar, Button, Flex, Menu, Paper, createStyles } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	MdAccountCircle,
	MdFavorite,
	MdHome,
	MdKey,
	MdKeyboardArrowDown,
	MdLogin,
	MdLogout,
	MdOutlineAddCircleOutline,
	MdPerson2,
	MdSell,
} from "react-icons/md";
import { auth } from "@firebaseConfig";
import { ThemeToggler } from "../common/ThemeToggler";
import { NavButton } from "../common/NavButton";

/***** TYPES *****/
interface NavProps {
	closeDrawer?: MouseEventHandler<HTMLDivElement> | undefined;
}

/*** styles */
const useStyles = createStyles((theme) => ({
	nav: {
		display: "flex",
		alignItems: "center",
		[theme.fn.smallerThan("sm")]: {
			flexDirection: "column",
			gap: "1em",
		},
	},
}));

/***** COMPONENT-FUNCTION *****/
export const Nav: FC<NavProps> = ({ closeDrawer }): JSX.Element => {
	/*** Variables***/
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

	/*** Return statement ***/
	return (
		<nav onClick={closeDrawer} className={classes.nav}>
			<NavButton href="/" icon={<MdHome size={20} />}>
				Home
			</NavButton>
			<NavButton href="/forSale" icon={<MdSell size={20} />}>
				For Sale
			</NavButton>
			<NavButton href="/forRent" icon={<MdKey size={20} />}>
				For Rent
			</NavButton>

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
						<Menu.Item>
							<NavButton href="/profile" icon={<MdPerson2 size={18} />}>
								My Profile
							</NavButton>
						</Menu.Item>
						<Menu.Item>
							<NavButton href="/favourite" icon={<MdFavorite size={18} />}>
								Favourites
							</NavButton>
						</Menu.Item>
						<Menu.Item>
							<NavButton href="/createNew" icon={<MdOutlineAddCircleOutline size={20} />}>
								Create New
							</NavButton>
						</Menu.Item>

						<Menu.Divider />
						<Menu.Item onClick={handleLogout}>
							<Button variant="subtle" leftIcon={<MdLogout size={18} />} color="gray" size="xs">
								Sign out
							</Button>
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			)}

			{!currentUser && (
				<NavButton href="/signin" icon={<MdLogin size={20} />}>
					Sign In
				</NavButton>
			)}
			<ThemeToggler />
		</nav>
	);
};
