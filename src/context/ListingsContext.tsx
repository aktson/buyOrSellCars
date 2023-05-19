"use client";
import React, { createContext, useContext, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { IListings } from "@/types/types";
import { boolean } from "yup";
import { FirebaseError } from "firebase/app";
import { notifications } from "@mantine/notifications";

interface ListingsContextProps {
	listings: IListings[] | null;
	setListings: React.Dispatch<React.SetStateAction<IListings[] | null>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	error: string | boolean | null;
}
const initialState = {
	listings: null,
	setListings: () => {},
	loading: false,
	setLoading: () => {},
	error: null,
};
const ListingsContext = createContext<ListingsContextProps>(initialState);

export function useListings() {
	return useContext(ListingsContext);
}

export function ListingsProvider({ children }: any) {
	const [listings, setListings] = useState<IListings[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean | string | null>(null);

	const fetchListings = async () => {
		setLoading(true);
		try {
			// get referance
			const listingsRef = collection(db, "listings");

			//query documents
			const listingsQuery = query(listingsRef, orderBy("timestamp", "desc"));

			const docSnap = await getDocs(listingsQuery);
			let data: any = [];

			docSnap.forEach((doc) => {
				return data.push({
					id: doc.id,
					data: doc.data(),
				});
			});
			if (data) setListings(data);
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

	React.useEffect(() => {
		fetchListings();
	}, []);
	return (
		<ListingsContext.Provider
			value={{
				listings,
				setListings,
				loading,
				setLoading,
				error,
			}}>
			{children}
		</ListingsContext.Provider>
	);
}

export default ListingsContext;
