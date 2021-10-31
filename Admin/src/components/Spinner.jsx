import React from 'react'
import './spinner.css'

function Spinner({ spin }) {
    return (
        <>
            {spin === 'spinner-true' ?
                <div className="spinner-container">
                    <div className="lds-spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                :
                <div className={"spinner-container"}>
                    <p style={{ fontSize: '16px' }}>No data Available</p>
                </div>
            }
        </>
    )
}

export default Spinner
