"use client";
/***** IMPORTS *****/
import React, { FC, useEffect, useState } from "react";
import { TextInput, PasswordInput, Text, Group, Stack, Container, LoadingOverlay, Button, Divider } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/common/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/yup/schema";
import dynamic from "next/dynamic";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@firebaseConfig";
import { GoogleLogin } from "@/components/GoogleLogin";
import { ULink } from "@/components/common/ULink";

/***** COMPONENT-FUNCTION *****/
const Signin: FC = (): JSX.Element => {
	/*** States ***/
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	/*** Variables ***/
	const router = useRouter();
	const { setCurrentUser, currentUser } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });

	/*** Functions ***/

	/** Submits form and signsin user
	 * @param {event}
	 * @return {void}
	 */
	const handleFormSubmit = async (data: any) => {
		setIsSubmitting(true);
		const { email, password } = data;

		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);

			setCurrentUser(auth.currentUser);

			if (userCredential.user) {
				router.push("/");
			}
		} catch (error) {
			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
				console.log(error);
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
				console.log(error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	/** Effects */
	useEffect(() => {
		if (currentUser || auth.currentUser) return router.push("/");
	}, [currentUser, auth.currentUser]);

	/*** Return statement ***/
	return (
		<Container my="xl">
			<Card mx="auto" width="400px">
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					<Stack spacing="xl">
						<h1>Sign In</h1>
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
							label="password"
							id="password"
							placeholder="Your password"
							radius="md"
							error={errors.password && (errors.password.message as string)}
						/>
					</Stack>
					<Text align="end" size="xs" color="blue" mt="xs">
						<Link href="/forgotPassword">forgot Password?</Link>
					</Text>

					<Button fullWidth={true} loading={isSubmitting} mt={"xl"} type="submit">
						{isSubmitting ? "signing in" : "Sign In"}
					</Button>
					<Divider label="Or" labelPosition="center" my="lg" />
					<GoogleLogin />
					<Group>
						<Text fz="xs" ml="auto">
							Don&apos;t have an account?
							<ULink href="/signup">Sign Up</ULink>
						</Text>
					</Group>
				</form>
				<LoadingOverlay visible={isSubmitting} overlayBlur={2} />
			</Card>
		</Container>
	);
};

export default dynamic(() => Promise.resolve(Signin), { ssr: false });
