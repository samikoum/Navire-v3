import React, { useContext, useEffect } from 'react'
import Context from '../../context/Context'
import './progressbar.css'

function ProgressBar() {
    const { step__1, step__2, step__3, step__4, step__5, step__6, step__7, step__8 } = useContext(Context)



    return (
        <>
            <div className="stepper-wrapper">
                <div className="stepper-item " ref={step__1}>
                    <div className="step-counter">1</div>
                    <div className="step-name">First</div>
                </div>
                <div className="stepper-item " ref={step__2}>
                    <div className="step-counter">2</div>
                    <div className="step-name">Second</div>
                </div>
                <div className="stepper-item " ref={step__3}>
                    <div className="step-counter">3</div>
                    <div className="step-name">Third</div>
                </div>
                <div className="stepper-item" ref={step__4}>
                    <div className="step-counter">4</div>
                    <div className="step-name">Forth</div>
                </div>
                <div className="stepper-item" ref={step__5}>
                    <div className="step-counter">5</div>
                    <div className="step-name">Fifth</div>
                </div>
                <div className="stepper-item" ref={step__6}>
                    <div className="step-counter">6</div>
                    <div className="step-name">Sixth</div>
                </div>
                <div className="stepper-item" ref={step__7}>
                    <div className="step-counter">7</div>
                    <div className="step-name">Seventh</div>
                </div>
                <div className="stepper-item" ref={step__8}>
                    <div className="step-counter">8</div>
                    <div className="step-name">Eighth</div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar
