/***** IMPORTS *****/
import React, { CSSProperties, FC } from "react";
import Image, { StaticImageData } from "next/image";

/***** TYPES *****/
interface UImageProps {
	src: string | StaticImageData;
	width?: number;
	height?: number;
	alt: string;
	style?: CSSProperties;
}

/***** COMPONENT-FUNCTION *****/
export const UImage: FC<UImageProps> = ({ src, height, width, alt, style }): JSX.Element => {
	const fill = width && height ? false : true;
	/*** Return statement ***/
	return <Image src={src} style={{ objectFit: "cover", ...style }} height={height} width={width} fill={fill} alt={alt} />;
};
