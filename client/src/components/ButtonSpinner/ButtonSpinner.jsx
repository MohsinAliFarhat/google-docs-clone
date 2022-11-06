import React from 'react';
import "./ButtonSpinner.css";

export const ButtonSpinner = (props) => {
    return (
        <>
            <div className="spinner-border spinner-sizing" role="status">
                <span className="sr-only"></span>
            </div>
        </>
    )
}
