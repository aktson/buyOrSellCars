import { ReactElement, useState } from "react";

const useMultiStepForm = (steps: ReactElement[]) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	function nextStep() {
		setCurrentIndex((prevIndex) => {
			if (prevIndex >= steps.length - 1) return prevIndex;
			return prevIndex + 1;
		});
	}

	function prevStep() {
		setCurrentIndex((prevIndex) => {
			if (prevIndex <= 0) return prevIndex;
			return prevIndex - 1;
		});
	}

	function gotoStep(index: number) {
		setCurrentIndex(index);
	}

	return {
		currentIndex,
		step: steps[currentIndex],
		isFirstStep: currentIndex === 0,
		isLastStep: currentIndex === steps.length - 1,
		nextStep,
		prevStep,
		gotoStep,
	};
};
