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

const image = yup.object().shape({
	image: yup
		.mixed()
		.required("Please add a image")
		.test("FILE_SIZE", "Uploaded file is too big.", (value) => !value.length || (value[0].size && value[0].size <= 2000000) || console.log(value))
		.test(
			"FILE_FORMAT",
			"Uploaded file has unsupported format.",
			(value) => !value.length || (value && SUPPORTED_FORMATS.includes(value[0].type))
		),
});

const arrayofImages = yup.array().required("Please add a images").of(image);

const imageOrArrayOfImagesSchema = yup.lazy((value) => {
	if (Array.isArray(value)) {
		return arrayofImages;
	}
	return image;
});

export const propertyFacilities = yup.object().shape({
	price: yup.number().typeError("Must be a number").required("Price is missing"),
	bathrooms: yup.number().typeError("Must be a number").required("Please add number of bathrooms"),
	bedrooms: yup.number().typeError("Must be a number").required("Please add number of bedrooms"),
});
