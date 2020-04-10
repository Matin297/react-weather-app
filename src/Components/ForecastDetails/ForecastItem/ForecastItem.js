import React from 'react'

function ForecastItem({ title, value }) {

    return (
        <div>
            <span> {title} </span>
            <span> {value} </span>
        </div>
    )

}

export default ForecastItem