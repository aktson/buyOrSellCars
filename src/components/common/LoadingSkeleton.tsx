/***** IMPORTS *****/
import { Paper, Skeleton, Stack } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface LoadingSkeletonProps {}

/***** COMPONENT-FUNCTION *****/
export const LoadingSkeleton: FC<LoadingSkeletonProps> = (): JSX.Element => {
	/*** Return statement ***/
	return (
		<Paper shadow="xs" sx={{ maxWidth: "350px" }}>
			<Skeleton height={200} mb="xl" />
			<Stack p="xl">
				<Skeleton height={8} radius="xl" />
				<Skeleton height={8} mt={6} radius="xl" />
				<Skeleton height={8} mt={6} width="70%" radius="xl" />
			</Stack>
		</Paper>
	);
};
