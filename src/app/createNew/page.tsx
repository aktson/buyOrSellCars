"use client";
/***** IMPORTS *****/
import { authenticate } from "@/components/authenticate";
import dynamic from "next/dynamic";
import React, { FC } from "react";

/***** TYPES *****/
interface CreateNewProps {}

/***** COMPONENT-FUNCTION *****/
const createNew: FC<CreateNewProps> = (): JSX.Element => {
	/*** Return statement ***/
	return <div>createNew</div>;
};

export default dynamic(() => Promise.resolve(authenticate(createNew)), { ssr: false });
