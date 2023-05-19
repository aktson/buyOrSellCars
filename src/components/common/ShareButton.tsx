/***** IMPORTS *****/
import React, { FC, useState } from "react";
import { ActionIcon, Badge } from "@mantine/core";
import { MdShare } from "react-icons/md";

/***** TYPES *****/
interface ShareButtonProps {}

/***** COMPONENT-FUNCTION *****/
export const ShareButton: FC<ShareButtonProps> = (): JSX.Element => {
	/*** States */
	const [isShareLinkCopied, setIsShareLinkCopied] = useState<boolean>(false);

	/*** Functions */
	/** Copies link of current location
	 * @return {void}
	 */
	const handleShareLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setIsShareLinkCopied(true);
		setTimeout(() => setIsShareLinkCopied(false), 2000);
	};

	/*** Return statement ***/
	return (
		<ActionIcon variant="outline" color="gray" onClick={handleShareLink} sx={{ position: "relative", width: "max-content", padding: "1em" }}>
			Share
			<MdShare size={18} />
			{isShareLinkCopied && (
				<Badge variant="light" sx={{ position: "absolute", bottom: "110%", left: "0" }}>
					Link copied!
				</Badge>
			)}
		</ActionIcon>
	);
};
