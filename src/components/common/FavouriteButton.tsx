/***** IMPORTS *****/
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@firebaseConfig";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { DocumentData, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

/***** TYPES *****/
interface FavouriteButtonProps {
	style?: React.CSSProperties;
	variant?: "filled" | "subtle" | "light" | "transparent" | "outline";
	color?: string;
	text?: boolean;
	onClick?: React.MouseEventHandler;
	listingId?: string;
}

/***** COMPONENT-FUNCTION *****/
export const FavouriteButton: FC<FavouriteButtonProps> = ({ text = false, style, variant, color, listingId }): JSX.Element => {
	/*** States ***/
	const [user, setUser] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean | string | null>(null);
	const [isFavourite, setIsFavourite] = useState<boolean>(false);

	/*** Variables */
	const router = useRouter();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) return setIsFavourite(false);
		const isFavouriteExist = user?.favourites.some((item: { id: string }) => item?.id === listingId);
		setIsFavourite(isFavouriteExist);
	}, [listingId, user, currentUser]);

	/*** Functions */
	const fetchUser = async () => {
		setLoading(true);
		const userId = auth?.currentUser?.uid;
		if (!userId) return;
		try {
			// get referance
			const usersRef = collection(db, "users");
			const userDocRef = doc(usersRef, userId);
			//query documents
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				setUser(userData);
			} else {
				console.log("User does not exist.");
			}
		} catch (error) {
			console.log(error);

			if (error instanceof FirebaseError) {
				setError(error?.message);
				notifications.show({ message: error.message, color: "red" });
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
			}
		} finally {
			setLoading(false);
		}
	};
	/*** Effects */
	React.useEffect(() => {
		fetchUser();
	}, [currentUser]);
	const handleOnClick = async () => {
		if (!currentUser) return router.push("/signin");
		try {
			// update in firestore
			const userRef = doc(db, "users", auth?.currentUser?.uid || "");
			if (isFavourite) {
				const filteredFavourites = user?.favourites.filter((item: { id: string }) => item.id !== listingId);
				await updateDoc(userRef, {
					favourites: filteredFavourites,
				});
				setIsFavourite((prev: boolean) => !prev);
			} else {
				await updateDoc(userRef, {
					favourites: arrayUnion({ id: listingId }),
				});
				setIsFavourite((prev: boolean) => !prev);
			}
		} catch (error) {}
	};

	/*** Return statement ***/
	return (
		<ActionIcon
			variant={variant ? variant : "transparent"}
			onClick={handleOnClick}
			style={{ ...style, width: "max-content", display: "flex", gap: "0.5em" }}
			color={color}>
			{text && (isFavourite ? "Added to Favourite" : "Add to favourite")}
			{isFavourite ? <MdFavorite size={22} fill="red" /> : <MdFavoriteBorder size={22} fill={color ? color : "white"} />}
		</ActionIcon>
	);
};
