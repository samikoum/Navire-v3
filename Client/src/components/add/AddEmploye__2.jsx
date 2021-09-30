import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Context from '../../context/Context'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Loader from '../Loader';
import ProgressBar from './ProgressBar'
import NavAddEmploye from '../navBar/NavAddEmploye'
import todayUpdateFunction from '../function/TodayUpdate'
import HeaderRight from '../includes/HeaderRight'





function AddEmploye__2() {
    const { isX, setIsX } = useContext(Context)
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { step__1, step__2 } = useContext(Context)
    const { loader, setLoader, btnNext } = useContext(Context)

    // useState
    const history = useHistory()

    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])
    useEffect(() => {
        step__1.current.classList.add('completed', 'active')
        if (isX > 2) {
            step__2.current.classList.add('completed', 'active')
            btnNext.current.classList = "btn btn-primary btn-add"
        }
    }, [isX])

    const handleBtnNext = () => {
        if (isX > 2) {
            console.log('btn clicked')
            return history.push('/add__3')
        }
    }

    const handleBtnPrevious = () => {
        return history.push('/add__1')
    }

    // Yup
    let schema = yup.object().shape({
        // nom: yup.string().required().trim(),
    })

    // useForm
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })

    // Form Submit 
    const submitForm = (data) => {
        console.log(data)
        const matricule = localStorage.getItem('mat')
        setLoader(true)
        axios.post(`http://localhost:3001/add_2`, { data, matricule }).then((response) => {
            console.log(response.data)
            localStorage.setItem('isX', response.data.x)
            setIsX(localStorage.getItem('isX'))
            setLoader(false)
            window.alert(response.data.msg)
        }).catch((error) => {
            setLoader(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
        // reset()
    }

    useEffect(() => {
        if (localStorage.getItem('mat') !== null) {
            axios.get(`http://localhost:3001/employe/${localStorage.getItem('mat')}`).then((response) => {
                console.log(response.data.table2)
                const tab = response.data.table2[0]
                // console.log(res.data.table1)

                setValue("post", tab['post_oc'])
                setValue("employer", tab['employer'])
                setValue("debut", todayUpdateFunction(tab['date_debut']))
                setValue("fin", todayUpdateFunction(tab['date_fin']))
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [])

    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <ProgressBar />
                        <form onSubmit={handleSubmit(submitForm)}>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("post")}
                                        required
                                    />
                                    <span className="floating-label">Post Occupé</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("employer")}
                                        required
                                    />
                                    <span className="floating-label">Employer</span>
                                </div>
                            </div>


                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("debut")}
                                        required
                                    />
                                    <span className="floating-label"></span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="date"
                                        className="inputText"
                                        {...register("fin")}
                                        required
                                    />
                                    <span className="floating-label"></span>
                                </div>
                            </div>

                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    : isX > 2 ?
                                        <p>Second Step Completed !</p>
                                        :
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-add">
                                            Save
                                        </button>
                                }
                            </div>
                        </form>
                        <div className="two-input btn-containers">
                            <button className="btn btn-primary btn-add " onClick={handleBtnPrevious}>Precident</button>
                            <button ref={btnNext} className="btn btn-add btn-next" onClick={handleBtnNext}>Suivant</button>
                        </div>
                    </div>
                </section>
            </div >

        </>
    )
}

export default AddEmploye__2