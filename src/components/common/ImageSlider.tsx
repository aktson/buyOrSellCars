/***** IMPORTS *****/
import React, { FC } from "react";
import { IListings } from "@/types/types";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import { createStyles } from "@mantine/core";

/***** TYPES *****/
interface ImageSliderProps {
	imgUrls?: IListings["imgUrls"];
}

/***** COMPONENT-FUNCTION *****/
export const ImageSlider: FC<ImageSliderProps> = ({ imgUrls }): JSX.Element => {
	/***Variables */

	/*** Return statement ***/
	return (
		<Carousel
			withIndicators
			slideSize="100%"
			height={550}
			align="center"
			slidesToScroll={1}
			styles={{
				indicator: {
					width: "1rem",
					height: "0.5rem",
					transition: "width 250ms ease",

					"&[data-active]": {
						width: "4rem",
					},
				},
				control: {
					"&[data-inactive]": {
						opacity: 0.3,
						cursor: "default",
					},
				},
			}}>
			{imgUrls?.map((img) => {
				return (
					<Carousel.Slide key={img}>
						<Image src={img} alt="img" fill={true} style={{ objectFit: "cover", pointerEvents: "none" }} />
					</Carousel.Slide>
				);
			})}
		</Carousel>
	);
};
