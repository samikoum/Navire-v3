import React, { useState, useEffect, useContext, forwardRef } from 'react'
import Context from '../context/Context'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner';
import NavAddEmploye from './navBar/NavAddEmploye';
import AddModel from './delete/AddModel'
import UpdateModel from './delete/UpdateModel'
import DeleteModel from './delete/DeleteModel';
import HeaderRight from './includes/HeaderRight';

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
import DownloadIcon from '@mui/icons-material/Download';

import { CSVLink, CSVDownload } from "react-csv";



function ManageAccounts() {

    // useContext
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu,
        btnShowModel, overlayAdd, overlayUpdate, overlay } = useContext(Context);

    // useState
    const [employes, setEmployes] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [emp_id, setemp_id] = useState('')
    const [matri, setmatri] = useState('')
    const [listen, setListen] = useState(false)
    let history = useHistory()

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
            title: "ID",
            field: "emp_id",
            cellStyle: { padding: '8px' },
            headerStyle: { color: '#fff' },
        },
        {
            title: "Matricule",
            field: "matricule",
            cellStyle: { padding: '8px' },
            headerStyle: { color: '#fff' },
        },
        {
            title: "Date de Creation",
            field: "added_on",
            type: "date",
            dateSetting: { locale: "en-GB" },
            cellStyle: { padding: '8px' }
        },
    ];

    // useEffect
    useEffect(() => {
        setSpinner(true)
        axios.get(`${process.env.REACT_APP_API}/users`).then((response) => {
            setEmployes(response.data)
            // setAdded_on(response.data[0])
            setSpinner(false)
        }).catch((error) => {
            setSpinner(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
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
        document.title = "Gestion Comptes"
    }, [])

    // handle Models
    const handleShowAddModel = () => {
        overlayAdd.current.classList.add('active')
        console.log(overlayAdd.current)
    }
    const handleShowUpdateModel = (e, employe) => {
        overlayUpdate.current.classList.add('active')
        setemp_id(employe.emp_id)
    }
    const handleShowModel = (e, employe) => {
        console.log(employe.emp_id)
        overlay.current.classList.add('active')
        setemp_id(employe.emp_id)
    }
    const headers = [
        { label: "ID", key: "emp_id" },
        { label: "Matricule", key: "matricule" },
        { label: "Nom", key: "nom" },
        { label: "Prénom", key: "prenom" },
    ];

    if (JSON.parse(localStorage.getItem('admin')).role !== 'super') {
        return (
            <div>

            </div>
        );
    }


    return (
        <>
            <AddModel
                listen={listen}
                setListen={setListen}
            />
            <UpdateModel
                emp_id={emp_id}
                listen={listen}
                setListen={setListen}
            />
            <DeleteModel
                emp_id={emp_id}
                listen={listen}
                setListen={setListen}
            />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="manageAccounts" />
                </section>
                <section className="coll-2 notif-employer" ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <div className="matrial-table-container">
                            <MaterialTable
                                title="Gestion des Comptes"
                                columns={columns}
                                data={employes}
                                icons={tableIcons}

                                options={{
                                    pageSizeOptions: [10, 20, 30, 40, 50], pageSize: 10, paginationType: "stepped",
                                    // exportButton: true, exportAllData: true, exportFileName: "Employers",
                                    columnsButton: true,
                                    headerStyle: { background: '#222D32', color: '#fff', fontSize: '16px', padding: '12px 8px', },
                                    rowStyle: (data, index) => index % 2 == 1 ? { background: '#dddddd', fontSize: '15px', } : { fontSize: '15px' },
                                    searchFieldStyle: { border: '1px solid #dddddd', padding: '5px 0px 5px 10px', borderRadius: '5px', marginRight: '8px' },
                                    actionsColumnIndex: -1
                                }}

                                actions={[
                                    // {
                                    //     icon: () => <CSVLink className="csv-ling" filename={"employers.csv"} data={employes} headers={headers}>
                                    //         <DownloadIcon style={{ color: '#757575' }} /></CSVLink>,
                                    //     isFreeAction: true,
                                    //     onClick: () => {
                                    //         // handleBtnExport()
                                    //     }
                                    // },
                                    {
                                        icon: () => <AddCircleIcon style={{ fontSize: '40px', color: '#4BB543' }} />,
                                        isFreeAction: true,
                                        onClick: () => {
                                            handleShowAddModel()
                                        }
                                    },
                                    {
                                        icon: () => <EditIcon style={{ color: '#FFC107', }} />,
                                        onClick: (event, employe) => {
                                            handleShowUpdateModel(event, employe)
                                        }
                                    },
                                    {
                                        icon: () => <DeleteIcon style={{ color: '#DC3545' }} />,
                                        onClick: (event, employe) => {
                                            handleShowModel(event, employe)
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
                    </div>
                </section>
            </div>
        </>
    )
}






export default ManageAccounts
