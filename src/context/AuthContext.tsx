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

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
}
