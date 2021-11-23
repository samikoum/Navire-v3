import React, { useState, useEffect, useContext, forwardRef } from 'react'
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
import Spinner from '../Spinner'
import ScrollToTop from '../ScrollToTop'
//--------------------------import Table------------------------
// Matriel-table
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

//--------------------------end Table---------------------------




function AddEmploye__3() {
    const { isX, setIsX } = useContext(Context)
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);
    const { step__1, step__2, step__3 } = useContext(Context)
    const { loader, setLoader, btnNext } = useContext(Context)
    const [table3, setTable3] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [listen, setListen] = useState(false)
    //-----------------------------------------------------------------
    // Matriel-table
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search  {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward style={{ color: '#fff' }} {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const columns = [
        {
            title: "Matricule",
            field: "matricule",
            cellStyle: { padding: '0 8px' },
            sorting: false
            // headerStyle: { color: '#fff' },
        },
        {
            title: "Post Occupé",
            field: "post_oc",
            cellStyle: { padding: '8px' },
            // headerStyle: { color: '#fff' },
            cellStyle: { padding: '8px' },
            sorting: false
        },
        {
            title: "Structure",
            field: "structure",
            cellStyle: { padding: '8px' },
            // headerStyle: { color: '#fff' },
            cellStyle: { padding: '8px' },
            sorting: false
        },
        {
            title: "Date début",
            field: "date_debut",
            type: "date",
            dateSetting: { locale: "en-GB" },
            cellStyle: { padding: '8px' }
        },
        {
            title: "Date fin",
            field: "date_fin",
            type: "date",
            dateSetting: { locale: "en-GB" },
            cellStyle: { padding: '8px' }
        },
        {
            title: "Type",
            field: "carriere",
            cellStyle: { padding: '8px' },
            // headerStyle: { color: '#fff' },
            cellStyle: { padding: '8px' },
            sorting: false
        },
    ];

    //------------------------------------------------------------------

    // useState
    const history = useHistory()

    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Add__3"
    }, [])
    useEffect(() => {
        step__1.current.classList.add('completed', 'active')
        step__2.current.classList.add('completed', 'active')

        if (isX > 3) {
            step__3.current.classList.add('completed', 'active')
            btnNext.current.classList = "btn btn-primary btn-add"
        }
    }, [isX])

    const handleBtnNext = () => {
        if (isX > 3) {
            console.log('btn clicked')
            return history.push('/add__4')
        }
    }

    const handleBtnPrevious = () => {
        return history.push('/add__2')
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
        axios.post(`${process.env.REACT_APP_API}/add_3`, { data, matricule }).then((response) => {
            // console.log(response.data)
            localStorage.setItem('isX', response.data.x)
            setIsX(localStorage.getItem('isX'))
            setListen(!listen)
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
        reset()
    }

    useEffect(() => {
        if (localStorage.getItem('mat') !== null) {
            axios.get(`${process.env.REACT_APP_API}/employe/${localStorage.getItem('mat')}`).then((response) => {
                console.log(response.data.table3)
                setTable3(response.data.table3)
                // const tab = response.data.table3[0]
                // // console.log(res.data.table1)
                // setValue("post", tab['post_oc'])
                // setValue("structure", tab['structure'])
                // setValue("debut", todayUpdateFunction(tab['date_debut']))
                // setValue("fin", todayUpdateFunction(tab['date_fin']))
                // setValue("carriere", tab['carriere'])
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [listen])

    const handleBtnDeleteRow = (e, row) => {
        console.log(row.ass_id)
        const rec_id = row.evo_id
        const matricule = row.matricule
        axios.post(`${process.env.REACT_APP_API}/table3/delete`, { matricule, rec_id }).then((response) => {
            console.log(response.data)
            setListen(!listen)
            window.alert(response.data)
        }).catch((error) => {
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
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
            <ScrollToTop />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <ProgressBar />
                        <form onSubmit={handleSubmit(submitForm)} style={{ margin: '0 auto' }}>

                            <div className="two-input">
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("post")}
                                        required
                                    />
                                    <span className="floating-label">Post Ocuppé</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("structure")}
                                        required
                                    />
                                    <span className="floating-label">Structure</span>
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
                                    <span className="floating-label label-date">Date début</span>
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
                                    <span className="floating-label label-date">Date fin</span>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("motif")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Motif du contrat</option>
                                        <option value="Reconduction">Reconduction</option>
                                        <option value="Promotion">Promotion</option>
                                        <option value="Redéploiement">Redéploiement</option>
                                        <option value="Mutation">Mutation</option>
                                        <option value="Autres">Autres</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="text"
                                        className="inputText"
                                        {...register("decision")}
                                        required
                                    />
                                    <span className="floating-label">Décision</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("contrat")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Nature de Contrat</option>
                                        <option value="cdi">cdi</option>
                                        <option value="cdd">cdd</option>
                                        <option value="stagiare">stagiare</option>
                                        <option value="autres">autres</option>
                                    </select>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <input
                                        type="number"
                                        min="0"
                                        className="inputText"
                                        {...register("num_annee")}
                                        required
                                    />
                                    <span className="floating-label">Nombre d'années travaillés</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                            </div>

                            <div className="two-input">
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("classe")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Classe</option>
                                        {row__1.map((classe, key) => {
                                            return <option value={`${classe}`} key={key}>{classe <= 9 ? 0 + '' + classe : classe}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="user-input-wrp" >
                                    <br />
                                    <select className="inputText"  {...register("qualification")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Qualification</option>
                                        {row__2.map((qualification, key) => {
                                            return <option value={`${qualification}`} key={key}>{qualification <= 9 ? 0 + '' + qualification : qualification}</option>
                                        })}
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
                                        {...register("salaire")}
                                        required
                                    />
                                    <span className="floating-label">Salaire de base</span>
                                    <p>{errors.nom?.message}</p>
                                </div>
                                <div className="user-input-wrp">
                                    <br />
                                    <select className="inputText"  {...register("carriere")} style={{ paddingTop: '14px', paddingBottom: '14px', height: '50px' }} id="selRegion" required >
                                        <option selected disabled value="">Type de Carriére</option>
                                        <option value="Interne">Interne</option>
                                        <option value="Externe">Externe</option>
                                    </select>
                                </div>
                            </div>

                            <div className="btn-container">
                                {loader ?
                                    <Loader />
                                    :
                                    <button
                                        type="submit"
                                        className="btn btn-secondary btn-add">
                                        Save
                                    </button>
                                }
                            </div>
                        </form>
                        <div className="two-input btn-containers" style={{ margin: '0 auto 20px' }}>
                            <button className="btn btn-primary btn-add " onClick={handleBtnPrevious}>Precident</button>
                            <button ref={btnNext} className="btn btn-add btn-next" onClick={handleBtnNext}>Suivant</button>
                        </div>
                        {/*-----------------Table---------------------*/}
                        <div className="matrial-table-container reclamation-table">
                            <MaterialTable
                                title="Employer/conge"
                                columns={columns}
                                data={table3}
                                icons={tableIcons}
                                // onRowClick={(e, row) => handleRowClick(e, row)}
                                options={{
                                    pageSizeOptions: [5, 10, 20], pageSize: 5, paginationType: "normal",
                                    // headerStyle: { background: '#eeeeee', color: '#000', fontSize: '14px', padding: '6px 8px' },
                                    headerStyle: { background: '#222D32', color: '#fff', fontSize: '14px', padding: '6px 8px' },
                                    // rowStyle: (data, index) => index % 2 == 1 ? { fontSize: '14px' } : { fontSize: '14px', fontWeight: 'bold' },
                                    rowStyle: { fontSize: '15px' },
                                    searchFieldStyle: { border: '1px solid #dddddd', padding: '5px 0px 5px 10px', borderRadius: '5px', marginRight: '8px' },
                                    toolbar: false,
                                    actionsColumnIndex: -1
                                }}

                                actions={[

                                    {
                                        icon: () => <DeleteIcon style={{ color: '#333', fontSize: '17px', padding: '0px' }} />,
                                        onClick: (event, row) => {
                                            handleBtnDeleteRow(event, row)
                                        }
                                    },

                                ]}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: (
                                            <Spinner spin={spinner ? 'spinner-true' : 'spinner-false'} />
                                        )
                                    }
                                }}
                            />
                        </div>

                        {/*-----------------End Table------------------------*/}
                    </div>
                </section>
            </div >

        </>
    )
}

export default AddEmploye__3
