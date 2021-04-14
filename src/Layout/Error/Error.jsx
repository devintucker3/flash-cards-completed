import React from "react";
import {Link} from "react-router-dom";

function Error({setError}) {
    setError(undefined);
    return (
        <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">An error occurred during your last request.</h4>
            <p>Please return to the home page and try again later.</p>
            <Link to="/">
                <h5 className="text-danger">
                    <span className="oi oi-home" />Go Home
                </h5>
            </Link>
        </div>
    )
}

export default Error;