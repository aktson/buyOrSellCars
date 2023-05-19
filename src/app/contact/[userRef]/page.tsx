/***** IMPORTS *****/
import React, { FC } from "react";

/***** TYPES *****/
interface ContactProps {
	params: { userRef: string };
}

/***** COMPONENT-FUNCTION *****/
const Contact: FC<ContactProps> = ({ params }): JSX.Element => {
	console.log(params);
	/*** Return statement ***/
	return <div>Contact</div>;
};

export default Contact;
