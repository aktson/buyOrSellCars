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
	bathrooms?: string;
	bedrooms?: string;
	imgUrls?: Array<string>;
	description?: string;
	furnished: boolean;
	title: string;
	price: string;
	timestamp: {
		seconds: string;
		nanoseconds: string;
	};
	address: string;
	userRef: string;
	type: string;
	id: string;
	city: string;
	parking?: boolean;
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
