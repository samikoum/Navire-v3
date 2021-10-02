import React, { useState, useEffect, useContext } from 'react'
import Context from '../context/Context'
import axios from 'axios'
import Spinner from './Spinner';
import NavAddEmploye from './navBar/NavAddEmploye';
import ModelDef from './delete/ModelDef';
import HeaderRight from './includes/HeaderRight';


function Trash() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, btnShowModel, overlay, overlayNav } = useContext(Context);

    // useState
    const [employes, setEmployes] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [emp_id, setemp_id] = useState('')
    const [listen, setListen] = useState(false)

    // useEffect
    useEffect(() => {
        setSpinner(true)
        axios.get('http://localhost:3001/employes/trash').then((response) => {
            // console.log(response.data)
            setEmployes(response.data)
            setSpinner(false)
        }).catch((error) => {
            setSpinner(false)
            if (error.response) {
                // window.alert(error.response.data)
            } else {
                // window.alert('Network error try again !')
            }
        })
    }, [listen])
    useEffect(() => {
        console.log(roww.current.offsetHeight)
        console.log(window.innerHeight)
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Corbeille"
    }, [])

    // handle functions
    const handleShowModel = (e) => {
        overlay.current.classList.add('active')
        setemp_id(e.target.id)
    }
    const handleBtnRestore = (e) => {
        const id = e.target.id
        axios.post(`http://localhost:3001/restore`, { id }).then((response) => {
            console.log(response.data)
            setListen(!listen)
            window.alert(response.data.msg)
        }).catch((error) => {
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }

    return (
        <>
            <ModelDef emp_id={emp_id} listen={listen} setListen={setListen} />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Trash" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <div className="table-container-overflow">
                            <table id="mytable" >
                                <thead>
                                    <tr>
                                        <th>Matricule</th>
                                        <th>Prénom</th>
                                        <th>Nom</th>
                                        <th>Adresse</th>
                                        <th>Region</th>
                                        <th style={{ width: '40px' }}>Restore</th>
                                        <th style={{ width: '50px' }}>Delete</th>
                                    </tr>
                                </thead>
                                {spinner ?
                                    <Spinner />
                                    :
                                    <tbody>
                                        {employes.map((employe, key) => {
                                            return <tr key={employe.rg_id}>
                                                <td>{employe.matricule}</td>
                                                <td>{employe.prenom}</td>
                                                <td>{employe.nom}</td>
                                                <td>{employe.address}</td>
                                                <td>{employe.region}</td>
                                                <td><button id={`${employe.rg_id}`} className="btn btn-primary" onClick={handleBtnRestore}>Restor</button></td>
                                                <td><button id={`${employe.rg_id}`} className="btn btn-danger" ref={btnShowModel} onClick={handleShowModel}>Delete</button></td>
                                            </tr>
                                        })}

                                        {/* <tr>
                                        <td>125555</td>
                                        <td>Khaled</td>
                                        <td>Ziane</td>
                                        <td>150 lgts lahmar kadour</td>
                                        <td>Ain Merene</td>
                                        <td><button className="btn btn-primary">View</button></td>
                                        <td><button className="btn btn-warning">Edit</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                    </tr> */}
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Trash
