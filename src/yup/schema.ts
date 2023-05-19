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
