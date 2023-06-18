import React from "react";
import "./spinner.css";

function LoadingSpinner({ boolean }) {
    return (
        <div className="spinner-container">
            <div className={boolean === true ? "loading-spinner" : ""}>
            </div>
        </div>
    );
}
export default LoadingSpinner