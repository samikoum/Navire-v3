import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import NavUser from '../navBar/NavUser';
import HeaderRightUser from '../includes/HeaderRightUser';
import UpdateModel from '../Models/UpdateModel';

import MenuIcon from '@mui/icons-material/Menu';
import './user.css'

function ProfileUser() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, overlayUpdate } = useContext(Context);

    const handleShowModel = () => {
        overlayUpdate.current.classList.add('active')
    }
    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])

    return (
        <>
            <UpdateModel emp_id={JSON.parse(localStorage.getItem('user')).user_id} />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavUser current="Profile" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <div className="coll-2-header">
                        <MenuIcon className="i-mui" ref={iconMenu} onClick={handleClickMenu} />
                        <HeaderRightUser />
                    </div>
                    <div className="coll-2-container" >
                        <div class="container-profile">
                            <div class="box-col-1">
                                <h1>Profile Information</h1>
                                <button className="btn btn-warning btn-edit" onClick={handleShowModel}>Edit Profile</button>
                            </div>
                            <hr style={{ marginBottom: '60px' }} />

                            <div class="box-col-1">
                                <label for="">Nom</label>
                                <h3>{JSON.parse(localStorage.getItem('user')).nom}</h3>

                            </div>
                            <hr />
                            <div class="box-col-1">
                                <label for="">Prénom</label>
                                <h3>{JSON.parse(localStorage.getItem('user')).prenom}</h3>

                            </div>
                            <hr />

                            <div class="box-col-1">
                                <label for="">Matricule</label>
                                <h3>{JSON.parse(localStorage.getItem('user')).matricule}</h3>

                            </div>
                            <hr />

                            <div class="box-col-1">
                                <label for="">Password</label>
                                <h3>**********</h3>
                            </div>
                            <hr />
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default ProfileUser
