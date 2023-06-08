import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs, where, DocumentData } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { IListings } from "@/types/types";

export const useListingsQuery = (type = "") => {
	const { data: listings, isLoading, error } = useQuery(["listings", type], fetchListings);

	async function fetchListings() {
		try {
			const listingsRef = collection(db, "listings");
			let listingsQuery = query(listingsRef, orderBy("timestamp", "desc"));

			if (type === "sale") {
				listingsQuery = query(listingsRef, where("type", "==", "sale"), orderBy("timestamp", "desc"));
			} else if (type === "rent") {
				listingsQuery = query(listingsRef, where("type", "==", "rent"), orderBy("timestamp", "desc"));
			}

			const snapshot = await getDocs(listingsQuery);
			const listingsData = snapshot.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}));
			return listingsData as IListings[] | DocumentData;
		} catch (error) {
			console.log(error);
			throw new Error("Error: failed to fetch listings");
		}
	}
	return { listings, isLoading, error };
};
