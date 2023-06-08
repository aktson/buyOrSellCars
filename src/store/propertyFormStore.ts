import { IListings } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const formData: Partial<IListings["data"] | null> = {
	title: "",
	description: "",
	city: "",
	address: "",
	bathrooms: 0,
	bedrooms: 0,
	imgUrls: [],
	price: 0,
	userRef: "",
	type: "",
	furnished: false,
	parking: false,
};

interface PropertyFormDataStates {
	formData: Partial<IListings["data"] | null>;
	currentIndex: number;
	nextStep: () => void;
	prevStep: () => void;
	jumpToStep: (number: number) => void;
	setFormData: (data: any) => void;
	reset: () => void;
}

export const usePropertyFormData = create(
	persist<PropertyFormDataStates>(
		(set) => ({
			formData,
			currentIndex: 0,
			setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
			nextStep: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
			prevStep: () => set((state) => ({ currentIndex: state.currentIndex - 1 })),
			jumpToStep: (number) => set(() => ({ currentIndex: number })),
			reset: () => set(() => ({ formData: null, currentIndex: 0 })),
		}),
		{
			name: "property",
		}
	)
);
