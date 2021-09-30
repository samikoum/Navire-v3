import React, { useEffect, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import NavUser from '../navBar/NavUser';
import HeaderRightUser from '../includes/HeaderRightUser';
import Loader from '../Loader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MenuIcon from '@mui/icons-material/Menu';
import './user.css'

function ReclamationUser() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, setIsAuth } = useContext(Context);
    const { loader, setLoader } = useContext(Context)
    // useForm
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])

    // Form Submit 
    const submitForm = (data) => {
        const emp_id = JSON.parse(localStorage.getItem('user')).user_id
        const matricule = JSON.parse(localStorage.getItem('user')).matricule
        setLoader(true)
        axios.post(`${process.env.REACT_APP_API}/reclamation`, { data, emp_id, matricule },
            { headers: { "Authorization": `${JSON.parse(localStorage.getItem('user')).token}` } })
            .then((response) => {
                setLoader(false)
                window.alert(response.data)
                reset()
            }).catch((error) => {
                setLoader(false)
                if (error.response) {
                    if (error.response.status == 403) {
                        setIsAuth(localStorage.removeItem('isAuth'))
                    }
                    window.alert(error.response.data)
                } else {
                    window.alert('Network error try again !')
                }
            })
        // reset()
    }


    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavUser current="Reclamation" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <div className="coll-2-header">
                        <MenuIcon className="i-mui" ref={iconMenu} onClick={handleClickMenu} />
                        <HeaderRightUser />
                    </div>
                    <div className="coll-2-container" >
                        <form onSubmit={handleSubmit(submitForm)} >
                            <div className="reclamation" >
                                <TextField
                                    id="outlined-basic"
                                    label="titre"
                                    variant="outlined"
                                    sx={{ width: '400px' }}
                                    {...register("title")}
                                    required
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    multiline
                                    rows={10}
                                    sx={{ width: '400px' }}
                                    {...register("description")}
                                    required
                                />
                                {loader ?
                                    <Loader />
                                    :
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className="btn-reclame">Reclame
                                    </Button>
                                }
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </>
    )
}

export default ReclamationUser
