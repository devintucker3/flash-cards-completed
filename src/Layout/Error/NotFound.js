import React from "react";
import {Link} from "react-router-dom";

function NotFound() {
  return (
    <div className="NotFound">
      <h2>Not Found</h2>
      <Link to="/">
        <h3>Go Home</h3>
      </Link>
    </div>
  );
}

export default NotFound;
