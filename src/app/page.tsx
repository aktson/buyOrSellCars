"use client";
/***** IMPORTS *****/
import React, { FC, Suspense } from "react";
import { ListingItem } from "@/components/ListingItem";
import dynamic from "next/dynamic";
import { Container, Grid } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { db } from "@firebaseConfig";
import { IListings } from "@/types/types";
import { Loading } from "@/components/common/Loading";
import { Error } from "@/components/common/Error";

/***** TYPES *****/
interface pageProps {}

/***** COMPONENT-FUNCTION *****/
const Home: FC<pageProps> = (): JSX.Element | null => {
	const { data, isLoading, isError, error } = useQuery(["listings"], fetchListings);

	async function fetchListings() {
		try {
			// get referance
			const listingsRef = collection(db, "listings");

			//query documents
			const listingsQuery = query(listingsRef, orderBy("timestamp", "desc"));

			const docSnap = await getDocs(listingsQuery);
			let data: any = [];

			docSnap.forEach((doc) => {
				return data.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			return data;
		} catch (error) {
			console.log(error);
			return error?.toString();
		}
	}

	/*** Return statement ***/
	if (isLoading) return <Loading />;
	if (error) return <Error error={error} />;
	return (
		<section>
			<Container size="lg" mx="auto" my="xl">
				<Grid>
					{data instanceof Array ? (
						data?.map((item: IListings) => {
							return (
								<Grid.Col span={4} key={item?.id}>
									<ListingItem item={item} />
								</Grid.Col>
							);
						})
					) : (
						<Error error={data} />
					)}
				</Grid>
			</Container>
		</section>
	);
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
