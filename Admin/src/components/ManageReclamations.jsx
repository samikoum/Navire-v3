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



function ManageReclamations() {

    // useContext
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu,
        btnShowModel, overlayAdd, overlayUpdate, overlay } = useContext(Context);
    const { isCall, setIsCall } = useContext(Context)

    // useState
    const [reclamations, setReclamations] = useState([])
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
            title: "Sender",
            field: "matricule",
            cellStyle: { padding: '0 8px' },
            sorting: false
            // headerStyle: { color: '#fff' },
        },
        {
            title: "Message",
            field: "description",
            cellStyle: { padding: '8px' },
            // headerStyle: { color: '#fff' },
            cellStyle: { padding: '8px', width: '70%' },
            sorting: false
        },
        {
            title: "Date",
            field: "added_on",
            type: "date",
            dateSetting: { locale: "en-GB" },
            cellStyle: { padding: '8px' }
        },
    ];

    // useEffect
    useEffect(() => {
        setSpinner(true)
        axios.get(`${process.env.REACT_APP_API}/reclamations`).then((response) => {
            setReclamations(response.data)
            setSpinner(false)
        }).catch((error) => {
            setSpinner(false)
            if (error.response) {
                window.alert(error.response.data)
            } else {
                window.alert('Network error try again !')
            }
        })
    }, [listen, isCall])

    useEffect(() => {
        console.log(roww.current.offsetHeight)
        console.log(window.innerHeight)
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Gestion Reclamations"
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

    const handleRowClick = (e, row) => {
        console.log(row.rec_id)
        const rec_id = row.rec_id
        axios.post(`${process.env.REACT_APP_API}/reclamations/update`, { rec_id })
        history.push(`/reclamations/${rec_id}`)
    }

    const handleBtnDeleteMessage = (e, row) => {
        console.log(row.rec_id)
        const rec_id = row.rec_id
        axios.post(`${process.env.REACT_APP_API}/reclamations/delete`, { rec_id }).then((response) => {
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

    if (JSON.parse(localStorage.getItem('admin')).role !== 'super') {
        return (
            <div>

            </div>
        );
    }


    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="manageReclamations" />
                </section>
                <section className="coll-2 notif-employer" ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <div className="matrial-table-container reclamation-table">
                            <MaterialTable
                                title="Gestion des Reclamations"
                                columns={columns}
                                data={reclamations}
                                icons={tableIcons}
                                onRowClick={(e, row) => handleRowClick(e, row)}
                                options={{
                                    pageSizeOptions: [5, 10, 20], pageSize: 10, paginationType: "normal",
                                    headerStyle: { background: '#eeeeee', color: '#000', fontSize: '14px', padding: '6px 8px' },
                                    // rowStyle: (data, index) => index % 2 == 1 ? { fontSize: '14px' } : { fontSize: '14px', fontWeight: 'bold' },
                                    rowStyle: (data, index) => data.status == 'vu' ? { fontSize: '14px' } : { fontSize: '14px', fontWeight: 'bold' },
                                    searchFieldStyle: { border: '1px solid #dddddd', padding: '5px 0px 5px 10px', borderRadius: '5px', marginRight: '8px' },
                                    actionsColumnIndex: -1
                                }}

                                actions={[

                                    {
                                        icon: () => <DeleteIcon style={{ color: '#333', fontSize: '17px', padding: '0px' }} />,
                                        onClick: (event, row) => {
                                            handleBtnDeleteMessage(event, row)
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






export default ManageReclamations
