import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@firebaseConfig";
import { IListings } from "@/types/types";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export const useAddListingMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const addListingMutation = useMutation({
		mutationFn: async ({ formData }: { formData: Partial<IListings["data"] | null> }) => {
			try {
				const docRef = await addDoc(collection(db, "listings"), formData);
				if (docRef) {
					notifications.show({ message: "Listing successfully published", color: "green" });
				}
				return docRef.id;
			} catch (error) {
				console.log(error);
				throw new Error("Something went wrong");
			}
		},

		onSuccess: (id, formData) => {
			// Invalidate and refetch the listings query after successful mutation
			queryClient.setQueriesData(["listings"], (prev: any) => [{ id: id, data: formData }, ...prev]);
			router.push(`/listingSpecific/${id}`);
		},
	});
	return addListingMutation;
};
