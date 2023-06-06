"use client";
/***** IMPORTS *****/
import React, { FC, useCallback, useEffect, useState } from "react";
import { Container, Text } from "@mantine/core";
import { auth, db } from "@firebaseConfig";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { DocumentData, collection, doc, getDoc } from "firebase/firestore";
import { useListings } from "@/context/ListingsContext";
import { IListings } from "@/types/types";
import { Listings } from "@/components/listings/Listings";
import { Card } from "@/components/common/Card";
import { Loading } from "@/components/common/Loading";
import { AlertBox } from "@/components/common/AlertBox";
import { authenticate } from "@/functions/authenticate";
import dynamic from "next/dynamic";
import { generatePageTitle } from "@/functions/functions";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Favourite: FC<pageProps> = (): JSX.Element => {
	/*** States ***/
	const [user, setUser] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean | string | null>(null);
	const [favourites, setFavourites] = useState<IListings[] | []>([]);

	/*** Variables */
	const { listings } = useListings();

	/*** Functions */
	/** Fetches user from user collection
	 * @param {event}
	 * @return {void}
	 */
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
	//fetch use to find user favourite listings
	useEffect(() => {
		fetchUser();
	}, []);

	const filterFavourites = useCallback(
		(item: IListings) => user?.favourites.map((favorite: any) => favorite).includes(item.id),
		[user?.favourites]
	);

	// By memoizing the filtering function, the component will rerender only if the user?.favourites value changes,
	// and the filtering will be performed efficiently.
	useEffect(() => {
		const favouriteListings = listings?.filter(filterFavourites);
		if (favouriteListings?.length > 0) setFavourites(favouriteListings);
	}, [filterFavourites, listings]);

	/*** Return statement ***/
	if (loading) return <Loading />;
	if (error) return <AlertBox text={error} />;
	return (
		<>
			<title>{generatePageTitle("Favourites")}</title>
			<Container size="lg" my="xl">
				<Text component="h1" size="xl" mb="md">
					Favourites
				</Text>
				{favourites?.length === 0 ? <Card>No items in favourites</Card> : <Listings listings={favourites} grow={false} />}
			</Container>
		</>
	);
};

export default dynamic(() => Promise.resolve(authenticate(Favourite)), { ssr: false });
