import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedLogin({ isAuth: isAuth, component: Component, ...rest }) {

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (!isAuth && isAuth == null) {
                        return <Component />
                    } else {
                        return <Redirect to={{ pathname: "/dashboard" }} />
                    }
                }}
            >
            </Route>
        </>
    )
}

export default ProtectedLogin
