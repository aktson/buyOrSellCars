import React from 'react'
import { collection, getDocs } from "firebase/firestore";
import { fireStoreDb } from "../../firebase.config";


const ListingsContext = React.createContext();

export function ListingsProvider({ children }) {

    const [listings, setListings] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null)

    const fetchListings = async () => {
        try {

            // get referance
            const listingsRef = collection(fireStoreDb, "listings");

            const docSnap = await getDocs(listingsRef)
            let listings = [];

            docSnap.forEach(doc => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            setListings(listings)

        } catch (error) {
            setError("Unknown error occured")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchListings();
    }, [])
    return <ListingsContext.Provider value={{
        listings, setListings, loading, setLoading, error
    }}>{children}</ListingsContext.Provider>
}

export default ListingsContext