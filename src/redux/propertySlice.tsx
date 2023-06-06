// import { IListings } from "@/types/types";
// // import { createSlice } from "@reduxjs/toolkit";

// export const propertyStates: Partial<IListings["data"]> = {
// 	title: "",
// 	description: "",
// 	city: "",
// 	address: "",
// 	bathrooms: 0,
// 	bedrooms: 0,
// 	imgUrls: [],
// 	price: 0,
// 	userRef: "",
// 	type: "",
// 	furnished: false,
// 	parking: false,
// };

// export const propertySlice = createSlice({
// 	name: "property",
// 	initialState: propertyStates,

// 	reducers: {
// 		setFormData: (state, action) => {
// 			return action.payload !== null ? { ...state, ...action.payload } : null;
// 		},
// 	},
// });
// export const propertyActionsSlice = createSlice({
// 	name: "propertyActions",
// 	initialState: { currentIndex: 0 },
// 	reducers: {
// 		nextStep: (state) => {
// 			return { ...state, currentIndex: state.currentIndex + 1 };
// 		},
// 		prevStep: (state) => {
// 			if (state.currentIndex <= 0) return state;
// 			return { ...state, currentIndex: state.currentIndex - 1 };
// 		},
// 		jumptToStep: (state, action) => {
// 			return { ...state, currentIndex: action.payload };
// 		},
// 		setCurrentIndex: (state, action) => {
// 			state.currentIndex = action.payload;
// 		},
// 	},
// });

// export const { setFormData } = propertySlice.actions;
// export const { nextStep, prevStep, jumptToStep, setCurrentIndex } = propertyActionsSlice.actions;
// export const propertyReducer = propertySlice.reducer;
// export const propertyActionsReducer = propertyActionsSlice.reducer;
