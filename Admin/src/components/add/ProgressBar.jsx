import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Context from '../../context/Context'
import './progressbar.css'

function ProgressBar() {
    const { step__1, step__2, step__3, step__4, step__5, step__6, step__7, step__8 } = useContext(Context)
    let history = useHistory()

    const handleProgressClicked = (i) => {
        switch (i) {
            case 1:
                history.push('/add__1')
                break;
            case 2:
                history.push('/add__2')
                break;
            case 3:
                history.push('/add__3')
                break;
            case 4:
                history.push('/add__4')
                break;
            case 5:
                history.push('/add__5')
                break;
            case 6:
                history.push('/add__6')
                break;
            case 7:
                history.push('/add__7')
                break;
            case 8:
                history.push('/add__8')
                break;
            default:
                history.push('/add__1')

        }
    }

    return (
        <>
            <div className="stepper-wrapper">
                <div className="stepper-item " ref={step__1} onClick={() => handleProgressClicked(1)}>
                    <div className="step-counter">1</div>
                    <div className="step-name">Personnelle</div>
                </div>
                <div className="stepper-item " ref={step__2} onClick={() => handleProgressClicked(2)}>
                    <div className="step-counter">2</div>
                    <div className="step-name">Expérience</div>
                </div>
                <div className="stepper-item " ref={step__3} onClick={() => handleProgressClicked(3)}>
                    <div className="step-counter">3</div>
                    <div className="step-name">Carrière</div>
                </div>
                <div className="stepper-item" ref={step__4} onClick={() => handleProgressClicked(4)}>
                    <div className="step-counter">4</div>
                    <div className="step-name">Formation</div>
                </div>
                <div className="stepper-item" ref={step__5} onClick={() => handleProgressClicked(5)}>
                    <div className="step-counter">5</div>
                    <div className="step-name">Salaire</div>
                </div>
                <div className="stepper-item" ref={step__6} onClick={() => handleProgressClicked(6)}>
                    <div className="step-counter">6</div>
                    <div className="step-name">Sanction</div>
                </div>
                <div className="stepper-item" ref={step__7} onClick={() => handleProgressClicked(7)}>
                    <div className="step-counter">7</div>
                    <div className="step-name">Assiduité</div>
                </div>
                <div className="stepper-item" ref={step__8} onClick={() => handleProgressClicked(8)}>
                    <div className="step-counter">8</div>
                    <div className="step-name">Congé</div>
                </div>
            </div>
        </>
    )
}

export default ProgressBar
