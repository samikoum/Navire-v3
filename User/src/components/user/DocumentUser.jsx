import React, { useState, useEffect, useContext, forwardRef } from 'react'
import Context from '../../context/Context'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import NavUser from '../navBar/NavUser';
import HeaderRightUser from '../includes/HeaderRightUser';
import Spinner from '../Spinner';

import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import './user.css'

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
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@material-ui/icons/Delete';

function DocumentUser() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu, setIsAuth } = useContext(Context);

    // useState
    const [documents, setDocuments] = useState([])
    const [spinner, setSpinner] = useState(false)
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
            title: "Subject",
            field: "subject",
            cellStyle: { padding: '0 8px' },
            sorting: false
            // headerStyle: { color: '#fff' },
        },
        {
            title: "Document",
            field: "name",
            cellStyle: { padding: '8px' },
            // headerStyle: { color: '#fff' },
            cellStyle: { padding: '8px', width: '50%' },
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
        const emp_id = JSON.parse(localStorage.getItem('user')).user_id
        const matricule = JSON.parse(localStorage.getItem('user')).matricule
        setSpinner(true)
        axios.post('http://localhost:3001/documents/user', { emp_id, matricule },
            { headers: { "Authorization": `${JSON.parse(localStorage.getItem('user')).token}` } }).then((response) => {
                setDocuments(response.data)
                setSpinner(false)
            }).catch((error) => {
                setSpinner(false)
                if (error.response) {
                    if (error.response.status == 403) {
                        setIsAuth(localStorage.removeItem('isAuth'))
                    }
                    window.alert(error.response.data)
                } else {
                    window.alert('Network error try again !')
                }
            })
    }, [listen])

    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])


    const handleRowClick = (e, row) => {
        console.log(row.rec_id)
        const rec_id = row.rec_id
        axios.post('http://localhost:3001/documents/update', { rec_id })
        history.push(`/reclamations/${rec_id}`)
    }

    const handleBtnDownloadDocument = (e, row) => {
        const emp_id = JSON.parse(localStorage.getItem('user')).user_id
        const matricule = JSON.parse(localStorage.getItem('user')).matricule
        const doc_id = row.doc_id
        const doc_name = row.name
        // axios.get(`http://localhost:3001/download`,
        //     { headers: { "Authorization": `${JSON.parse(localStorage.getItem('user')).token}` } }).then((response) => {
        //         console.log(response.data)
        //         setListen(!listen)
        //         window.alert(response.data)
        //     }).catch((error) => {
        //         if (error.response) {
        //             window.alert(error.response.data)
        //         } else {
        //             window.alert('Network error try again !')
        //         }
        //     })
        axios({
            url: `http://localhost:3001/download/${doc_name}`,
            method: 'POST',
            responseType: 'blob', // important
            data: { emp_id, matricule, doc_id },
            headers: { "Authorization": `${JSON.parse(localStorage.getItem('user')).token}` }
        }).then((response) => {
            setListen(!listen)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', doc_name);
            document.body.appendChild(link);
            link.click();
        });
    }
    console.log(spinner)
    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavUser current="Document" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <div className="coll-2-header">
                        <MenuIcon className="i-mui" ref={iconMenu} onClick={handleClickMenu} />
                        <HeaderRightUser />
                    </div>
                    <div className="coll-2-container" >
                        <div className="matrial-table-container reclamation-table">
                            <MaterialTable
                                title="Documents"
                                columns={columns}
                                data={documents}
                                icons={tableIcons}
                                // onRowClick={(e, row) => handleRowClick(e, row)}
                                options={{
                                    pageSizeOptions: [5, 10, 20], pageSize: 10, paginationType: "normal",
                                    headerStyle: { background: '#eeeeee', color: '#000', fontSize: '15px', padding: '10px 8px' },
                                    // rowStyle: (data, index) => index % 2 == 1 ? { fontSize: '14px' } : { fontSize: '14px', fontWeight: 'bold' },
                                    rowStyle: (data, index) => data.status == 'vu' ? { fontSize: '15px' } : { fontSize: '15px', fontWeight: 'bold' },
                                    searchFieldStyle: { border: '1px solid #dddddd', padding: '5px 0px 5px 10px', borderRadius: '5px', marginRight: '8px' },
                                    actionsColumnIndex: -1
                                }}

                                actions={[

                                    {
                                        icon: () => <DescriptionIcon style={{ color: '#F72015' }} />,
                                        onClick: (event, row) => {
                                            handleBtnDownloadDocument(event, row)
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

export default DocumentUser
