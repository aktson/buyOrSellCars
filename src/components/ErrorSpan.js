import React from 'react'
import { MdOutlineWarning } from "react-icons/md"

function ErrorSpan({ message }) {
    return (
        <span className='text-red-500 text-sm flex gap-1 items-center'><MdOutlineWarning size={18} />{message}</span>
    )
}

export default ErrorSpan