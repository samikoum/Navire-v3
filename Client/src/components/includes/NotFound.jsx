import React from 'react'
import { useHistory } from 'react-router-dom'
import './notfound.css'

function NotFound() {
    let history = useHistory()
    const goBack = () => {
        history.goBack()
    }
    return (
        <>
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 ">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center ">404</h1>
                                    <img src="/images/notfound.gif" alt="" />
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">
                                        Look like you're lost
                                    </h3>

                                    <p>the page you are looking for not avaible!</p>

                                    <div className="link_404" onClick={goBack}>Go back</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NotFound
