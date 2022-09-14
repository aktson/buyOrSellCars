import React from 'react';
import { MdCopyright } from "react-icons/md"


function Footer() {
    return (
        <footer className='bg-primary text-base-100 p-4'>
            <p className='flex gap-2 justify-center p-2'><MdCopyright />Designed & Developed by AnkSon</p>
        </footer>
    )
}

export default Footer