"use client";
/***** IMPORTS *****/
import { Card } from "@/components/common/Card";
import { auth } from "@firebaseConfig";
import { Button, Container, Stack, TextInput, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

/***** TYPES *****/
interface ForgotPasswordProps {}

/***** COMPONENT-FUNCTION *****/
const ForgotPassword: FC<ForgotPasswordProps> = (): JSX.Element => {
	/*** Variables ***/
	const router = useRouter();

	/*** States ***/
	const [email, setEmail] = useState<string>("");
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	/*** Functions ***/

	/** Sends user reset password link
	 * @return {void}
	 */
	const handleSubmit = async () => {
		setIsSubmitting(true);
		try {
			await sendPasswordResetEmail(auth, email);
			notifications.show({ message: "Email was sent", color: "green" });
		} catch (error) {
			console.log(error);
			if (error instanceof FirebaseError) {
				notifications.show({ message: error?.message, color: "red" });
				console.log(error);
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
				console.log(error);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	/*** Effects ***/
	//returns if user is alreadu logged in
	useEffect(() => {
		if (auth.currentUser) return router.push("/");
	}, [auth.currentUser]);

	/*** Return statement ***/
	return (
		<Container my="xl">
			<Card mx="auto" width="400px">
				<form onSubmit={handleSubmit}>
					<Stack spacing="xl">
						<h1>Forgot Password</h1>
						<TextInput
							onChange={(e) => setEmail(e.target.value)}
							label="Email"
							id="email"
							placeholder="Enter Your email address"
							radius="md"
							value={email}
						/>
					</Stack>

					<Button fullWidth={true} loading={isSubmitting} mt={"xl"} type="submit">
						Send Reset Link
					</Button>
				</form>
				<LoadingOverlay visible={isSubmitting} overlayBlur={2} />
			</Card>
		</Container>
	);
};
export default dynamic(() => Promise.resolve(ForgotPassword), { ssr: false });
