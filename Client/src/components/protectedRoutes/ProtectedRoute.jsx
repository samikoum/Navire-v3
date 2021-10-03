import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ isAuth: isAuth, component: Component, ...rest }) {

    const { setIsAuth } = { ...rest }
    useEffect(() => {
        if (localStorage.getItem('admin') !== null) {
            axios.get(`${process.env.REACT_APP_API}/verifyToken`,
                { headers: { "Authorization": `${JSON.parse(localStorage.getItem('admin')).token}` } })
                .then((res) => {
                    if (res.data === 'OK') {
                        console.log(res.data)
                    }
                }).catch((error) => {
                    if (error.response) {
                        setIsAuth(localStorage.removeItem('isAuth'))
                    }
                })
        } else {
            setIsAuth(localStorage.removeItem('isAuth'))
        }

    }, [])


    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (isAuth && isAuth !== null) {
                        return <Component />
                    } else {
                        localStorage.removeItem('admin')
                        return <Redirect to={{ pathname: "/" }} />
                    }
                }}
            >
            </Route>
        </>
    )
}

export default ProtectedRoute
