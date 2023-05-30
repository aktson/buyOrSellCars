"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

export const authenticate = <P extends object>(Component: ComponentType<P>) => {
	const AuthComponent = (props: P) => {
		const { currentUser } = useAuth();

		const router = useRouter();

		useEffect(() => {
			if (!currentUser) {
				router.push("/signin");
			}
		}, [currentUser, router.push]);

		// Pass the props to the wrapped component
		return currentUser ? <Component {...props} /> : null;
	};

	return AuthComponent;
};

// const Authenticate = ({ children }: { children: React.ReactNode }) => {
// 	const { currentUser } = useAuth();

// 	const router = useRouter();

// 	useEffect(() => {
// 		if (!currentUser) {
// 			router.push("/signin");
// 		}
// 	}, [currentUser, router.push]);

// 	// Pass the props to the wrapped component

// 	return <>{currentUser ? children : null}</>;
// };
// export default Authenticate;
