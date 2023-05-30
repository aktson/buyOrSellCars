"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { DocumentData, collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { IListings } from "@/types/types";

import { FirebaseError } from "firebase/app";
import { notifications } from "@mantine/notifications";

interface ListingsContextProps {
	listings: IListings[] | null | DocumentData;
	setListings: React.Dispatch<React.SetStateAction<IListings[] | null | DocumentData>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	error: string | null | FirebaseError;
}
const initialState = {
	listings: null,
	setListings: () => {},
	isLoading: false,
	setIsLoading: () => {},
	error: null,
};
const ListingsContext = createContext<ListingsContextProps>(initialState);

export function useListings() {
	return useContext(ListingsContext);
}

export function ListingsProvider({ children }: any) {
	const [listings, setListings] = useState<IListings[] | null | DocumentData>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null | FirebaseError>(null);

	// Function to fetch initial listings
	const fetchListings = () => {
		setIsLoading(true);
		try {
			const listingsRef = collection(db, "listings");
			const listingsQuery = query(listingsRef, orderBy("timestamp", "desc"));

			const unsubscribe = onSnapshot(listingsQuery, (snapshot) => {
				const updatedListings = snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}));
				setListings(updatedListings);
			});

			// Return the unsubscribe function
			return unsubscribe;
		} catch (error) {
			console.log(error);
			if (error instanceof FirebaseError) {
				setError(error);
			} else {
				setError("An error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	// Fetch initial listings when the component mounts
	useEffect(() => {
		const unsubscribe = fetchListings();

		// Clean up the listener when the component unmounts
		return () => unsubscribe?.();
	}, []);

	return (
		<ListingsContext.Provider
			value={{
				listings,
				setListings,
				isLoading,
				setIsLoading,
				error,
			}}>
			{children}
		</ListingsContext.Provider>
	);
}

export default ListingsContext;
