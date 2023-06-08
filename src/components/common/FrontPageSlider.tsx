/***** IMPORTS *****/
import React, { FC } from "react";
import { IListings } from "@/types/types";
import { Carousel } from "@mantine/carousel";
import { Button, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { MdTrendingFlat } from "react-icons/md";
import { DocumentData } from "firebase/firestore";

interface FrontPageSliderProps {
	listings?: IListings[] | DocumentData;
}

/***** COMPONENT-FUNCTION *****/
export const FrontPageSlider: FC<FrontPageSliderProps> = ({ listings }): JSX.Element => {
	/*** Return statement ***/
	return (
		<Carousel slideSize="100%" height={500} slideGap="md">
			{listings?.map((item: IListings) => {
				return (
					<Carousel.Slide key={item.id}>
						<Image
							src={item?.data?.imgUrls?.[0] || ""}
							alt="img"
							fill={true}
							style={{ objectFit: "cover", pointerEvents: "none", objectPosition: "center" }}
							onClick={(e) => {
								e.stopPropagation();
							}}
						/>
						<Stack
							mx="auto"
							align="center"
							p="sm"
							sx={{
								position: "absolute",
								bottom: "1em",
								right: "0px",
								left: "0px",
								textAlign: "center",
								maxWidth: "550px",
								background: "linear-gradient(112.1deg, rgba(32, 38, 57, 0.6) 11.4%, rgba(63, 76, 119, 0.3) 70.2%)",
							}}>
							<Text size="2.5em" color="white">
								{item?.data?.title}
							</Text>
							<Button rightIcon={<MdTrendingFlat size={18} />}>
								<Link href={`/listingSpecific/${item?.id}`}>View</Link>
							</Button>
						</Stack>
					</Carousel.Slide>
				);
			})}
		</Carousel>
	);
};
