import React from 'react'

const Campo = ({label, id, type, placeholder}) => {
    return (
        <div className="my-5">
            <label className="block mb-1" htmlFor={id}>{label}:</label>
            <input
                className="w-full px-3 py-2 rounded-md md:border outline-none"
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Campo