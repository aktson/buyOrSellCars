"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseUser } from "@/types/types";
import { auth } from "@firebaseConfig";

interface AuthContextProps {
	currentUser: FirebaseUser | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: null, setCurrentUser: () => {} });

export function useAuth() {
	return useContext(AuthContext);
}
export function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{loading ? null : children}</AuthContext.Provider>;
}
