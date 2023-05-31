import { db } from "@firebaseConfig";
import { FirebaseError } from "firebase/app";
import { collection, doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export const getUser = async (userId: string) => {
	if (!userId) return;
	try {
		// get referance
		const usersRef = collection(db, "users");
		const userDocRef = doc(usersRef, userId);
		//query documents

		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			const userData = userDocSnap.data();
			return userData;
		} else {
			console.log("User does not exist.");
		}
	} catch (error) {
		console.log(error);

		if (error instanceof FirebaseError) {
			return error;
		} else {
			return "An error occurred";
		}
	}
};
