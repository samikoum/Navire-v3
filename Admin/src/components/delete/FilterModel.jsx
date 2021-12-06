import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import todayUpdateFunction from '../function/TodayUpdate';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';


function FilterModel({ employes, setEmployes }) {
    // const [dateNaissance, setdateNaissance] = useState(null)
    // const [dateRecrutement, setdateRecrutement] = useState(null)
    // const [sexe, setsexe] = useState(null)
    // const [post, setpost] = useState(null)
    // const [employer, setemployer] = useState(null)
    // const [contrat, setcontrat] = useState(null)

    const [isFilter, setIsFilter] = useState(false)

    // useForm
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({})

    const handleSaveFilter = (data) => {
        axios.post(`${process.env.REACT_APP_API}/filter`, data)
            .then((response) => {
                console.log(response.data)
                // window.alert(response.data)
                setEmployes(response.data)
            }).catch((error) => {
                // if (error.response) {
                //     window.alert(error.response.data)
                // } else {
                //     window.alert('Network error try again !')
                // }
            })
    }

    var row__1 = []
    var row__2 = []
    for (let i = 1; i <= 22; i++) {
        row__1.push(i)
    }
    for (let i = 1; i <= 20; i++) {
        row__2.push(i)
    }

    return (
        <>
            <div className="filter-container">
                <div
                    className="btn-filter-container"
                    tabindex="1"
                    onClick={() => setIsFilter(!isFilter)}
                >
                    <SettingsIcon className="btn-filter" /> <h3>FILTERS</h3>
                </div>
                {isFilter ?
                    <div className="filter-content form-1">
                        <form onSubmit={handleSubmit(handleSaveFilter)} className="form-1" >
                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        // onChange={(e) => setdateNaissance(e.target.value)}
                                        // value={dateNaissance}
                                        {...register("dateNaissance")}
                                    // required
                                    />
                                    <span className="floating-label">Date de naissance</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        // onChange={(e) => setdateRecrutement(e.target.value)}
                                        // value={dateRecrutement}
                                        {...register("dateRecrutement")}

                                    // required
                                    />
                                    <span className="floating-label">Date de recrutement</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" {...register("sexe")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Sexe</option>
                                        <option value="Masculin">Masculin</option>
                                        <option value="Féminin">Féminin</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        // required
                                        {...register("post")}
                                    />
                                    <span className="floating-label">Post</span>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText" {...register("structure")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Structure</option>
                                        <option value="Cadre">Cadre</option>
                                        <option value="Maitrise">Maitrise</option>
                                        <option value="Exécution">Exécution</option>
                                        <option value="Autres">Autres</option>
                                    </select>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText" {...register("contrat")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Type de Contrat</option>
                                        <option value="cdi">cdi</option>
                                        <option value="cdd">cdd</option>
                                        <option value="stagiare">stagiare</option>
                                        <option value="autres">autres</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("region")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Unité</option>
                                        <option value="Alger"> Unité Alger</option>
                                        <option value="Oran">Unité Oran</option>
                                        <option value="Bejaia">Unité Bejaia</option>
                                        <option value="Siège">Unité Siège</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("classe")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Classe</option>
                                        {row__1.map((classe, key) => {
                                            return <option value={`${classe <= 9 ? '0' + classe : classe}`} key={key}>{classe <= 9 ? 0 + '' + classe : classe}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("qualification")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion"  >
                                        <option selected value="">Qualification</option>
                                        {row__2.map((qualification, key) => {
                                            return <option value={`${qualification <= 9 ? '0' + qualification : qualification}`} key={key}>{qualification <= 9 ? 0 + '' + qualification : qualification}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("conge")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" >
                                        <option selected value="">Nature du congé</option>
                                        <option value="reliquat">reliquat</option>
                                        <option value="annuel">annuel</option>
                                    </select>
                                </div>
                            </div>
                            <div className="two-input">

                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        {...register("salaire_max")}
                                    />
                                    <span className="floating-label">Salaire de base</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        {...register("absence_num")}
                                    />
                                    <span className="floating-label">Nombre d'absence</span>
                                </div>

                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                className="btn-save-filter"
                            >Save</Button>
                        </form>
                    </div>
                    : null
                }

            </div>

        </>
    )
}

export default FilterModel
