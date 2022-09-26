import React from 'react';
import Loader from '../Loader';
import ListingsContext from '../context/ListingsContext';
import { Alert } from '@material-tailwind/react';
import { MdOutlineErrorOutline } from "react-icons/md"
import ListingItem from '../ListingItem';



function Explore() {

    const { listings, loading, error } = React.useContext(ListingsContext)



    if (loading) {
        return <Loader />
    }
    if (error) {
        return <div className='container mx-auto max-w-xs my-4'><Alert color='red' icon={<MdOutlineErrorOutline />}>{error}</Alert></div>
    }

    return (
        <section className='container  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl'>
            {listings.length > 0 ? listings.map(item => {
                return <ListingItem item={item} key={item.id} />
            })
                :
                <p>No listings available now</p>}</section>
    )
}

export default Explore