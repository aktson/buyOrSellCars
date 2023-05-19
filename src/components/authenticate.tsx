"use client";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@firebaseConfig";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export const authenticate = <P extends object>(Component: ComponentType<P>) => {
	const AuthComponent = (props: P) => {
		const { currentUser } = useAuth();

		const router = useRouter();

		useEffect(() => {
			if (!currentUser || auth.currentUser) {
				router.replace("/signin");
			}
		}, [currentUser, auth.currentUser]);

		// Pass the props to the wrapped component
		return currentUser ? <Component {...props} /> : null;
	};

	return AuthComponent;
};
