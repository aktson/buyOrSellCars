/***** IMPORTS *****/
import React, { FC } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { MdLightMode, MdNightlight } from "react-icons/md";

/***** TYPES *****/
interface ThemeTogglerProps {}

/***** COMPONENT-FUNCTION *****/
export const ThemeToggler: FC<ThemeTogglerProps> = (): JSX.Element => {
	/***Variables */
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";

	/*** Return statement ***/
	return (
		<ActionIcon
			variant="light"
			color={dark ? "indigo.3" : "indigo"}
			onClick={() => toggleColorScheme()}
			title="Toggle color scheme"
			ml={14}
			size="lg">
			{dark ? <MdNightlight size={18} /> : <MdLightMode size={18} />}
		</ActionIcon>
	);
};
