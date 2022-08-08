import React from 'react'

const Campo = ({label, id, type, placeholder, value, setState}) => {
    return (
        <div className="my-5">
            <label className="block mb-1" htmlFor={id}>{label}:</label>
            <input
                className="w-full px-3 py-2 rounded-md md:border outline-none"
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={e => setState(e.target.value)}
            />
        </div>
    )
}

export default Campo