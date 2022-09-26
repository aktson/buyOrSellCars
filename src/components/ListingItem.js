import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md"

function ListingItem({ item }) {


    const data = item.data;

    const { name, imgUrls, price, year, km } = data;
    const convertedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <Link to={`listing-specific/${item.id}`} className="hover:animate-pulse">
            <div className='p-4 flex flex-col gap-1 '>
                {/* <div style={{ background: `url(${imgUrls[0]}) no-repeat center`, backgroundSize: "cover", height: "10rem", width: "", }}></div> */}
                <img src={imgUrls[0]} alt="img-blur-shadow" className="h-full w-full" />
                <div className='flex justify-between items-center'>
                    <Typography variant="h4">{name}</Typography>
                    <MdFavoriteBorder size={24} />
                </div>
                <div className='flex justify-between items-center'>
                    <Typography variant="paragraph"> {year}</Typography>
                    <Typography variant="paragraph"> KM {km}  </Typography>
                    <Typography variant="paragraph">NOK {convertedPrice}</Typography>
                </div>
            </div>
        </Link>
    )
}

export default ListingItem