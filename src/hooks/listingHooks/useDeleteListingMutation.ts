import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@firebaseConfig";

export const useDeleteListingMutation = () => {
	const queryClient = useQueryClient();

	const deleteListingMutation = useMutation({
		mutationFn: async ({ id }: { id: string }) => {
			try {
				await deleteDoc(doc(db, "listings", id));
			} catch (error) {
				console.log(error);
				throw new Error("Something went wrong");
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["listings"]);
		},
	});

	return deleteListingMutation;
};
