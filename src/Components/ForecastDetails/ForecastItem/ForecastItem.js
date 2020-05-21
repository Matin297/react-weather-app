import React from 'react'
import PropTypes from 'prop-types'


function ForecastItem({ title, value }) {

    return (
        <div>
            <span> {title} </span>
            <span> {value} </span>
        </div>
    )

}

ForecastItem.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default ForecastItem