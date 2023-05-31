"use client";
/***** IMPORTS *****/
import React, { FC } from "react";
import { Notifications } from "@mantine/notifications";

/***** COMPONENT-FUNCTION *****/
const Notification: FC = (): JSX.Element => {
	/*** Return statement ***/
	return <Notifications defaultChecked position="top-right" autoClose={3000} />;
};

export default Notification;
