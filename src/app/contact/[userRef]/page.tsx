/***** IMPORTS *****/
import { generatePageTitle } from "@/functions/functions";
import React, { FC } from "react";

/***** TYPES *****/
interface ContactProps {
	params: { userRef: string };
}

/***** COMPONENT-FUNCTION *****/
const Contact: FC<ContactProps> = ({ params }): JSX.Element => {
	/*** Return statement ***/
	return (
		<>
			<title>{generatePageTitle("Contact")}</title>
			<div>Contact</div>
		</>
	);
};

export default Contact;
