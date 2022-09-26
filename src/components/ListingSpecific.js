import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

function ListingSpecific() {

    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        navigate("/");
    }



    return (
        <div>ListingSpecific</div>
    )
}

export default ListingSpecific