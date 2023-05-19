/***** IMPORTS *****/
import { ActionIcon } from "@mantine/core";
import React, { FC, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

/***** TYPES *****/
interface FavouriteButtonProps {
	style?: React.CSSProperties;
	variant?: "filled" | "subtle" | "light" | "transparent" | "outline";
	color?: string;
	text?: boolean;
}

/***** COMPONENT-FUNCTION *****/
export const FavouriteButton: FC<FavouriteButtonProps> = ({ text, style, variant, color }): JSX.Element => {
	/*** States ***/
	const [isFavourite, setIsFavourite] = useState<boolean>(false);

	/*** Return statement ***/
	return (
		<ActionIcon
			variant={variant ? variant : "transparent"}
			onClick={() => setIsFavourite((prev: boolean) => !prev)}
			style={{ ...style, width: "max-content", display: "flex", gap: "0.5em" }}
			color={color}>
			{text && isFavourite ? "Added to Favourite" : "Add to favourite"}
			{isFavourite ? <MdFavorite size={22} fill="red" /> : <MdFavoriteBorder size={22} fill={color ? color : "white"} />}
		</ActionIcon>
	);
};
