import React, { useEffect, useContext } from 'react'
import Context from '../context/Context'
import NavAddEmploye from './navBar/NavAddEmploye';
import UpdateProfile from './delete/UpdateProfile';
import HeaderRight from './includes/HeaderRight';
function Profile() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, overlayUpdate } = useContext(Context)

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
        document.title = "Profile"
    }, [])
    return (
        <>
            <UpdateProfile admin_id={JSON.parse(localStorage.getItem('admin')).admin_id} />
            <div className="roww" ref={roww}>
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Profile" />
                </section>

                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <div class="container-profile">
                            <div class="box-col-1">
                                <h1>Profile Information</h1>
                                <button className="btn btn-warning btn-edit" onClick={handleShowModel}>Edit Profile</button>
                            </div>
                            <hr style={{ marginBottom: '60px' }} />

                            <div class="box-col-1">
                                <label for="">Nom</label>
                                <h3>{JSON.parse(localStorage.getItem('admin')).nom}</h3>

                            </div>
                            <hr />
                            <div class="box-col-1">
                                <label for="">Prénom</label>
                                <h3>{JSON.parse(localStorage.getItem('admin')).prenom}</h3>

                            </div>
                            <hr />

                            <div class="box-col-1">
                                <label for="">Email</label>
                                <h3>{JSON.parse(localStorage.getItem('admin')).email}</h3>

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

export default Profile
