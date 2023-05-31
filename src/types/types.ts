import { ReactNode } from "react";

export interface FirebaseUser {
	uid: string;
	displayName?: string | null;
	email?: string | null;
	phoneNumber?: string | null;
	photoURL?: string | null;
	providerId: string;
}
export interface IListings {
	id: string;
	data: {
		bathrooms?: number;
		bedrooms?: number;
		imgUrls?: Array<string>;
		mainImage?: string;
		description?: string;
		furnished: boolean;
		title: string;
		price: number;
		timestamp: {
			seconds: number;
			nanoseconds: number;
		};
		address: string;
		userRef: string;
		type: string | null;
		city: string;
		parking?: boolean;
	};
}

export interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

export interface SignInFormData {
	email: string;
	password: string;
}

export interface ButtonProps {
	children?: ReactNode;
	disabled?: boolean;
	className?: string | string[];
	loading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	fullWidth?: boolean;
	type?: "button" | "reset" | "submit";
	leftIcon?: JSX.Element;
	color?: string;
	isActive?: boolean;
	style?: object;
	compact?: boolean;
	variant?: "red";
}
export interface IUserCollection {
	email: string;
	name?: string;
	photoUrl?: string;
	favourites?: { id: string }[];
	timeStamp: string;
}
