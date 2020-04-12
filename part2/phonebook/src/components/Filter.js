import React from 'react'

const Filter = ({setFilter}) => {
    const handleChange = (e) => setFilter(e.target.value)
    return <div>filter shown with <input onChange={handleChange}/></div>
}

export default Filter