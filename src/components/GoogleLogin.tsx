/***** IMPORTS *****/
import { auth, db } from "@firebaseConfig";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { FC } from "react";
import { FcGoogle } from "react-icons/fc";

/***** TYPES *****/
interface GoogleLoginProps {}

/***** COMPONENT-FUNCTION *****/
export const GoogleLogin: FC<GoogleLoginProps> = (): JSX.Element => {
	/***Variables ***/
	const router = useRouter();
	const pathname = usePathname();

	/*** Functions ***/
	const onGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// check for user
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			// if user doesnt exist then create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, "users", user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			router.push("/");
		} catch (error) {
			console.log(error);

			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
				console.log(error);
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
				console.log(error);
			}
		}
	};

	/*** Return statement ***/
	return (
		<Button fullWidth={true} mt="xl" mb="sm" variant="light" rightIcon={<FcGoogle size={20} />} onClick={onGoogleClick}>
			Sign {pathname === "/signin" ? "In" : "Up"} with
		</Button>
	);
};
