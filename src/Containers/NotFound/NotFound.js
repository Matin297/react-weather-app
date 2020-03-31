import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"

function NotFound() {

    return (
        <div className="not-found">

            <Link to="/" className="back-butt">
                Home
            </Link>

            <h1>
                Page Not Found!
            </h1>
        </div>
    )

}

export default NotFound