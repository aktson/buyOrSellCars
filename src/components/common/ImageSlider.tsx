/***** IMPORTS *****/
import React, { FC } from "react";
import { IListings } from "@/types/types";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import ImageMissing from "public/image-missing.jpg";

/***** TYPES *****/
interface ImageSliderProps {
	imgUrls?: IListings["data"]["imgUrls"];
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
			{imgUrls?.length === 0 ? (
				<Image src={ImageMissing} alt="image missing" fill={true} style={{ objectFit: "cover", pointerEvents: "none" }} />
			) : (
				imgUrls?.map((img: string) => {
					return (
						<Carousel.Slide key={img}>
							<Image
								src={img || ImageMissing}
								alt="img"
								fill={true}
								style={{ objectFit: "cover", pointerEvents: "none" }}
								onClick={(e) => {
									e.stopPropagation();
								}}
							/>
						</Carousel.Slide>
					);
				})
			)}
		</Carousel>
	);
};
