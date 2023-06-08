import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { IListings } from "@/types/types";

export const useEditListingMutation = () => {
	const queryClient = useQueryClient();

	const editListingMutation = useMutation({
		mutationFn: async ({ listingId, updatedData }: { listingId: string; updatedData: Partial<IListings> }) => {
			try {
				const docRef = doc(db, "listings", listingId);
				await updateDoc(docRef, updatedData);
			} catch (error) {
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
		onSuccess: () => {
			// Invalidate and refetch the listings query after successful mutation
			queryClient.invalidateQueries(["listings"]);
		},
	});

	return editListingMutation;
};
