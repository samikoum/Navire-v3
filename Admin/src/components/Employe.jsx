import React, { useState, useEffect, useContext, forwardRef } from 'react'
import Context from '../context/Context'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Spinner from './Spinner';
import NavAddEmploye from './navBar/NavAddEmploye';
import Model from './delete/Model';
import HeaderRight from './includes/HeaderRight';
import ScrollToTop from './ScrollToTop'

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
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { CSVLink } from "react-csv";
import { jsPDF } from "jspdf";



function Employe() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, overlay, setIsX } = useContext(Context);
    const [employes, setEmployes] = useState([])
    const [spinner, setSpinner] = useState(false)
    const [emp_id, setemp_id] = useState('')
    const [listen, setListen] = useState(false)
    const [csvTable, setCsvTable] = useState([])
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
            title: "Matricule",
            field: "matricule",
            cellStyle: { padding: '8px' },
            headerStyle: { color: '#fff' },
        },
        {
            title: "Nom",
            field: "nom",
            cellStyle: { padding: '8px' },
            headerStyle: { color: '#fff' },
        },
        {
            title: "Prénom",
            field: "prenom",
            cellStyle: { padding: '8px' }
        },
        {
            title: "Adresse",
            field: "address",
            sorting: false,
            cellStyle: { padding: '8px', width: '25%' }
        },
        {
            title: "Unité",
            field: "region",
            sorting: false,
            cellStyle: { padding: '8px' }
        },

    ];
    // end Matriel-table

    // useEffect
    useEffect(() => {
        setSpinner(true)
        axios.get(`${process.env.REACT_APP_API}/employes`).then((response) => {
            // console.log(response.data)
            setEmployes(response.data)
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
        // console.log(roww.current.offsetHeight)
        // console.log(window.innerHeight)
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Employers"
    }, [])

    // Date
    // const todayNaissance = todayFunction(dateNaissance)

    // handle functions
    const handleRowClick = (e, row) => {
        if (localStorage.getItem('isX') == null || localStorage.getItem('isX') >= 9) {
            localStorage.setItem('mat', row.matricule)
            localStorage.setItem('isX', 9)
            setIsX(localStorage.getItem('isX'))
            // const rec_id = row.rec_id
            history.push(`/add__1`)
        } else {
            window.alert('Something in process...')
        }

    }

    const handleBtnExportPdf = () => {

        const headers = [["Matricule", "Nom", "Prénom", "Date Naissance", "Address", "Region"]];
        const data = employes.map(elt =>
            [elt.matricule, elt.nom, elt.prenom, elt.date_naissance, elt.address, elt.region]);

        let content = {
            startY: 25,
            head: headers,
            body: data,
        };
        const doc = new jsPDF();
        var height = doc.internal.pageSize.height;
        doc.text("Employers", 15, 20);
        doc.autoTable(content);
        doc.save("a4.pdf");
    }
    const handleShowModel = (e, employe) => {
        overlay.current.classList.add('active')
        setemp_id(employe.rg_id)
    }
    // Csv + Pdf
    const headers = [
        { label: "Matricule", key: "matricule" },
        { label: "Nom", key: "nom" },
        { label: "Prénom", key: "prenom" },
        { label: "Date Naissance", key: "date_naissance" },
        { label: "Address", key: "address" },
        { label: "Region", key: "region" },
    ];


    if (JSON.parse(localStorage.getItem('admin')).role !== 'super') {
        return (
            <div>

            </div>
        );
    }

    return (
        <>
            <Model emp_id={emp_id} listen={listen} setListen={setListen} />
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Employe" />
                </section>
                <section className="coll-2 notif-employer" ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container" >
                        <div className="matrial-table-container">
                            <MaterialTable
                                title="Gestion des Employers"
                                columns={columns}
                                data={employes}
                                icons={tableIcons}
                                onRowClick={(e, row) => handleRowClick(e, row)}
                                options={{
                                    pageSizeOptions: [10, 20, 30, 40, 50], pageSize: 10, paginationType: "stepped",
                                    // exportButton: true, exportAllData: true, exportFileName: "Employers",
                                    columnsButton: true,
                                    sorting: false,
                                    headerStyle: { background: '#222D32', color: '#fff', fontSize: '16px', padding: '12px 8px', },
                                    rowStyle: (data, index) => index % 2 == 1 ? { background: '#dddddd', fontSize: '15px', } : { fontSize: '15px' },
                                    searchFieldStyle: { border: '1px solid #dddddd', padding: '5px 0px 5px 10px', borderRadius: '5px', marginRight: '8px' },
                                    actionsColumnIndex: -1
                                }}

                                actions={[
                                    {
                                        icon: () => <CSVLink className="csv-ling" filename={"employers.csv"} data={employes} headers={headers}>
                                            <DownloadIcon style={{ color: '#757575' }} /></CSVLink>,
                                        isFreeAction: true,
                                        onClick: () => {
                                            // handleBtnExport()
                                        }
                                    },
                                    {
                                        icon: () => <PictureAsPdfIcon style={{ color: '#757575' }} />,
                                        isFreeAction: true,
                                        onClick: () => {
                                            handleBtnExportPdf()
                                        }
                                    },
                                    {
                                        icon: () => <AddCircleIcon style={{ fontSize: '40px', color: '#4BB543' }} />,
                                        isFreeAction: true,
                                        onClick: () => {
                                            if (localStorage.getItem('isX') >= 9) {
                                                localStorage.removeItem('mat')
                                                localStorage.removeItem('isX')
                                                setIsX(localStorage.getItem('isX'))
                                                // const rec_id = row.rec_id
                                                history.push(`/add__1`)
                                            } else {
                                                history.push(`/add__1`)
                                            }
                                            // history.push('/add__1')
                                        }

                                    },
                                    {
                                        icon: () => <VisibilityIcon style={{ color: 'rgb(61, 61, 243)', }} />,
                                        onClick: (event, employe) => {
                                            history.push(`/employe/${employe.matricule}`)
                                        }
                                    },
                                    {
                                        icon: () => <EditIcon style={{ color: '#FFC107', }} />,
                                        onClick: (event, employe) => {
                                            history.push(`/employe/update/${employe.matricule}`)
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
                        {/* <table id="mytable" >
                            <thead>
                                <tr>
                                    <th>Matricule</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Adresse</th>
                                    <th>Region</th>
                                    <th style={{ width: '40px' }}>Details</th>
                                    <th style={{ width: '40px' }}>Edit</th>
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
                                            <td><Link to={`/view/${employe.matricule}`}><button className="btn btn-primary">View</button></Link></td>
                                            <td><Link to={`/update/matricule=${employe.matricule}`}> <button className="btn btn-warning">Edit</button> </Link></td>
                                            <td><button id={`${employe.rg_id}`} className="btn btn-danger" ref={btnShowModel} onClick={handleShowModel}>Delete</button></td>
                                        </tr>
                                    })}
                                </tbody>
                            }
                        </table> */}
                    </div>
                </section>
            </div>
        </>
    )
}






export default Employe
