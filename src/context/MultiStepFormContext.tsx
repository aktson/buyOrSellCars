/***** IMPORTS *****/
import { AddPropertyFacilities } from "@/components/addPropertyForms/AddPropertyFacilities";
import { AddPropertyImages } from "@/components/addPropertyForms/AddPropertyImages";
import { AddPropertyInfo } from "@/components/addPropertyForms/AddPropertyInfo";
import { Summary } from "@/components/addPropertyForms/Summary";
import { IListings } from "@/types/types";
import { ReactNode, createContext, useContext, useState } from "react";

/***** TYPES *****/
interface MultiStepFormContextProps {
	formData: Partial<IListings["data"]> | null;
	setFormData: React.Dispatch<React.SetStateAction<Partial<IListings["data"]> | null>>;
	nextStep: Function;
	prevStep: Function;
	jumpToStep: Function;
	currentIndex: number;
	formSteps: JSX.Element[];
}

const INITIAL_FORMDATA: Partial<IListings["data"]> = {
	title: "",
	description: "",
	city: "",
	address: "",
	bathrooms: 0,
	bedrooms: 0,
	imgUrls: [],
	price: "",
	userRef: "",
	type: "",
	furnished: false,
	parking: false,
};

const MultiStepFormContext = createContext<MultiStepFormContextProps>({
	formData: {},
	setFormData: () => {},
	nextStep: () => {},
	prevStep: () => {},
	jumpToStep: () => {},
	currentIndex: 0,
	formSteps: [],
});

export function MultiStepFormProvider({ children }: { children: ReactNode }) {
	const [formData, setFormData] = useState<typeof INITIAL_FORMDATA | null>(INITIAL_FORMDATA);

	const formSteps = [<AddPropertyInfo key={1} />, <AddPropertyFacilities key={2} />, <AddPropertyImages key={3} />, <Summary key={4} />];

	const [currentIndex, setCurrentIndex] = useState(0);

	function nextStep() {
		setCurrentIndex((prevIndex) => {
			if (prevIndex >= formSteps.length - 1) return prevIndex;
			return prevIndex + 1;
		});
	}

	function prevStep() {
		setCurrentIndex((prevIndex) => {
			if (prevIndex <= 0) return prevIndex;
			return prevIndex - 1;
		});
	}

	function jumpToStep(index: number) {
		setCurrentIndex(index);
	}

	return (
		<MultiStepFormContext.Provider value={{ formData, setFormData, nextStep, prevStep, currentIndex, formSteps, jumpToStep }}>
			{children}
		</MultiStepFormContext.Provider>
	);
}

export function useMultiStepForm() {
	return useContext(MultiStepFormContext);
}
