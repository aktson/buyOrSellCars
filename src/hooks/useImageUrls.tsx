import { storeImageToFirebase } from "@/functions/storeImageToFirebase";
import { notifications } from "@mantine/notifications";

/** Keeps previous states and Updates fields onChange, goes to nextstep
 * @param {fields} <IListings> fields
 * @return {void}
 */
export const useImageUrls = async (images: File[]) => {
	const newImgUrls = (await Promise.all([...images].map((image) => storeImageToFirebase(image))).catch(() => {
		notifications.show({ message: "Images could not be uploaded", color: "red" });
		return;
	})) as string[];

	return newImgUrls;
};
