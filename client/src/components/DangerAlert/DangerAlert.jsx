import React from 'react'
import "./DangerAlert.css"

export const DangerAlert = (props) => {
    return (
        <div className="alert alert-danger" role="alert">
           * {props.errMsg}
        </div>
    )
}
