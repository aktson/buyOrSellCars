"use client";
/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { TextInput, PasswordInput, Text, Group, Stack, Container, LoadingOverlay, Button, Divider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseUser, SignInFormData } from "@/types/types";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/common/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "@/yup/schema";
import dynamic from "next/dynamic";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { FcGoogle } from "react-icons/fc";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { ULink } from "@/components/common/ULink";
import { GoogleLogin } from "@/components/common/GoogleLogin";
import { generatePageTitle } from "@/functions/functions";

/***** TYPES *****/
interface SignUpProps {}

/***** COMPONENT-FUNCTION *****/
const SignUp: FC<SignUpProps> = (): JSX.Element => {
	/*** States ***/
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	/*** Variables ***/
	const router = useRouter();
	const { setCurrentUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(signupSchema) });

	/*** Functions ***/

	/** Submits form and signsin user
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (data: any) => {
		setIsSubmitting(true);

		const { name, email, password } = data;
		try {
			const auth = getAuth();

			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			if (!userCredential) return;
			const user = userCredential.user;

			updateProfile(auth.currentUser as any, {
				displayName: name,
			});

			// save user to firestore
			const formDataCopy = { ...data };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, "users", user.uid), formDataCopy);

			router.push("/");
		} catch (error) {
			console.log(error);
			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
			}
		} finally {
			setIsSubmitting(false);
		}
	};
	/*** Return statement ***/
	return (
		<>
			<title>{generatePageTitle("Sign Up")}</title>
			<Container my="xl">
				<Card mx="auto" width="400px">
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<Stack spacing="sm">
							<h1>Sign Up</h1>
							<TextInput
								{...register("name")}
								id="name"
								label="Name"
								placeholder="Your full name"
								radius="md"
								error={errors.name && (errors.name.message as string)}
							/>
							<TextInput
								{...register("email")}
								id="email"
								label="Email"
								placeholder="Your email address"
								radius="md"
								error={errors.email && (errors.email.message as string)}
							/>

							<PasswordInput
								{...register("password")}
								label="Password"
								id="password"
								placeholder="Your password"
								radius="md"
								error={errors.password && (errors.password.message as string)}
							/>
						</Stack>

						<Button fullWidth={true} loading={isSubmitting} mt={"md"} type="submit">
							{isSubmitting ? "Signing up.." : "Sign Up"}
						</Button>
						<Divider label="Or" labelPosition="center" my="md" />
						<GoogleLogin />
						<Group mt={8}>
							<Text fz="xs" ml="auto">
								Already have an account?
								<ULink href="/signin">Sign In</ULink>
							</Text>
						</Group>
					</form>
					<LoadingOverlay visible={isSubmitting} overlayBlur={2} />
				</Card>
			</Container>
		</>
	);
};

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
