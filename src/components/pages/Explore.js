import React from 'react';
import Loader from '../Loader';
import ListingsContext from '../context/ListingsContext';



function Explore() {

    const { listings, loading } = React.useContext(ListingsContext)

    console.log(listings)


    return (
        <div>Home page</div>
    )
}

export default Explore