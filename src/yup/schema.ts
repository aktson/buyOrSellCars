import * as yup from "yup";

export const schema = yup.object().shape({
	email: yup.string().required("Email is required").email("Please enter valid email address"),
	password: yup.string().required("Password is required").min(6, "Password must be atleast 6 characters"),
});
export const signupSchema = yup.object().shape({
	name: yup.string().required("Name is required").min(6, "Must be atleast 6 characters"),
	email: yup.string().required("Email is required").email("Please enter valid email address"),
	password: yup.string().required("Password is required").min(6, "Password must be atleast 6 characters"),
});

export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export const FILE_SIZE = 160 * 1024;

export const propertyInfo = yup.object().shape({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Please add decription "),
	address: yup.string().required("Please add address"),
	city: yup.string().required("Please add city"),
	type: yup.string().required("Please select type"),
});

export const propertyFacilities = yup.object().shape({
	price: yup.number().typeError("Must be a number").required("Price is missing").moreThan(0, "Price can not be 0 "),
	bathrooms: yup.number().typeError("Must be a number").required("Please add number of bathrooms"),
	bedrooms: yup.number().typeError("Must be a number").required("Please add number of bedrooms"),
});

export const editPropertySchema = yup.object().shape({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Please add decription "),
	address: yup.string().required("Please add address"),
	city: yup.string().required("Please add city"),
	type: yup.string().required("Please select type"),
	price: yup.number().typeError("Must be a number").required("Price is missing").moreThan(0, "Price can not be 0 "),
	bathrooms: yup.number().typeError("Must be a number").required("Please add number of bathrooms"),
	bedrooms: yup.number().typeError("Must be a number").required("Please add number of bedrooms"),
});
