/***** IMPORTS *****/
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "@firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "@mantine/notifications";

/** Store image to firebase/storage and getDownloadUrl
 * @param {image}
 * @return {string} imgUrl
 */
export const storeImageToFirebase = async (image: any) => {
	return new Promise((resolve, reject) => {
		const fileName = `${auth?.currentUser?.uid}-name=${image.name}-${uuidv4()}`;

		const storageRef = ref(storage, "images/" + fileName);

		const uploadTask = uploadBytesResumable(storageRef, image);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				notifications.show({
					id: "upload",
					message: "Upload is in progress",
					color: "blue",
					loading: true,
				});

				console.log("Upload is " + progress + "% done");

				switch (snapshot.state) {
					case "paused":
						console.log("Upload is paused");
						break;
					case "running":
						console.log("Upload is running");
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
				console.log("uploadTask", error);
				reject(error);
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL);

					notifications.hide("upload");
					notifications.show({ message: "Images successfully uploaded", color: "green" });
				});
			}
		);
	});
};
