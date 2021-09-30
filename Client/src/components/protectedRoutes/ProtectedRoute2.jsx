import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute2({ isX: isX, component: Component, ...rest }) {

    const { isAuth, setIsAuth, valueisX } = { ...rest }

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
                    if ((isAuth && isAuth !== null) && (isX >= valueisX && isX !== null)) {
                        return <Component />
                    } else {
                        return <Redirect to={{ pathname: "/add__1" }} />
                    }
                }}
            >
            </Route>
        </>
    )
}

export default ProtectedRoute2
