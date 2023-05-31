/***** IMPORTS *****/
import React, { CSSProperties, FC } from "react";
import { ULink } from "./ULink";
import { Breadcrumbs, useMantineTheme } from "@mantine/core";
import { Text } from "@mantine/core";

/***** TYPES *****/
interface BreadCrumbProps {
	items: { title: string; href: string }[];
	style?: CSSProperties;
}

/***** COMPONENT-FUNCTION *****/
export const BreadCrumb: FC<BreadCrumbProps> = ({ items, style }): JSX.Element => {
	const theme = useMantineTheme();
	/*** Return statement ***/
	return (
		<Breadcrumbs style={style}>
			{items?.map((item, index) => {
				if (index === items.length - 1) {
					return (
						<Text key={index} size="sm" color={theme.colorScheme === "dark" ? theme.colors.gray[5] : theme.colors.gray[6]}>
							{item.title}
						</Text>
					);
				}
				return (
					<ULink href={item.href} key={index} color="red">
						{item.title}
					</ULink>
				);
			})}
		</Breadcrumbs>
	);
};
