import React from 'react'
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { fireStoreDb } from "../../firebase.config";
import { toast } from "react-toastify";

const ListingsContext = React.createContext();

export function ListingsProvider({ children }) {

    const [listings, setListings] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

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
            setLoading(false)

        } catch (error) {
            toast.error("Unknown error occured")
            console.log(error)
        }
    }

    React.useEffect(() => {
        fetchListings();
    }, [])
    return <ListingsContext.Provider value={{
        listings, setListings, loading, setLoading
    }}>{children}</ListingsContext.Provider>
}

export default ListingsContext