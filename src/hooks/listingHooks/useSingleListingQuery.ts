import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@firebaseConfig";

export const useSingleListingQuery = (listingId: string) => {
	const { data: listing, isLoading, error } = useQuery(["listings", listingId], fetchListing);

	async function fetchListing() {
		try {
			const docRef = doc(db, "listings", listingId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			}
		} catch (error) {
			throw new Error("Failed to fetch");
		}
	}
	return { listing, isLoading, error };
};
