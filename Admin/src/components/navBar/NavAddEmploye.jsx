import React, { useContext } from 'react'
import Context from "../../context/Context"
import { Link, useHistory } from 'react-router-dom'

// icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';


function NavAddEmploye({ current }) {
    const { handleCloseMenu, iconCloseMenu, setIsAuth } = useContext(Context);
    let history = useHistory()

    const logout = () => {
        localStorage.removeItem('admin')
        localStorage.removeItem('isAuth')
        setIsAuth(localStorage.getItem('isAuth'))
        history.push('/')
    }
    return (
        <>
            <div className="coll-1-header">
                <MenuIcon className="i-mui" ref={iconCloseMenu} onClick={handleCloseMenu} />
                <div className="logo-container">
                    <img src="/images/logo.png" className="logo" />
                </div>
                <h1>Erenav.</h1>
            </div>
            <div className="coll-1-container">
                <Link to="/profile">
                    <div className={current == 'Profile' ? 'current dash' : 'dash'}><AccountCircleIcon className="i-mui" />
                        Profile
                    </div>
                </Link>
                <Link to="/dashboard">
                    <div className={current == 'Dashboard' ? 'current dash' : 'dash'}><DashboardIcon className="i-mui" />
                        Dashboard
                    </div>
                </Link>

                {JSON.parse(localStorage.getItem('admin')).role == 'super' ?
                    <div>
                        <Link to="/employers">
                            <div id="employe" className={current == 'Employe' ? 'current dash' : 'dash'}><PeopleIcon className="i-mui" />
                                Employes
                            </div>
                        </Link>
                        <Link to="/documents">
                            <div className={current == 'manageDocuments' ? 'current dash' : 'dash'}><DescriptionIcon className="i-mui" />
                                Gestion Documents
                            </div>
                        </Link>
                        <Link to="/accounts">
                            <div className={current == 'manageAccounts' ? 'current dash' : 'dash'}><ManageAccountsIcon className="i-mui" />
                                Gestion Accounts
                            </div>
                        </Link>
                        <Link to="/reclamations">
                            <div className={current == 'manageReclamations' ? 'current dash' : 'dash'}><ReportProblemIcon className="i-mui" />
                                Gestion Reclamations
                            </div>
                        </Link>
                        <Link to="/trash">
                            <div className={current == 'Trash' ? 'current dash' : 'dash'}><RestoreFromTrashIcon className="i-mui" />
                                Trash
                            </div>
                        </Link>
                    </div>
                    : JSON.parse(localStorage.getItem('admin')).role == 'alger' ?
                        <Link to="/employers/alger">
                            <div id="employe" className={current == 'Employe' ? 'current dash' : 'dash'}><PeopleIcon className="i-mui" />
                                Employers Alger
                            </div>
                        </Link>
                        : JSON.parse(localStorage.getItem('admin')).role == 'oran' ?
                            <Link to="/employers/oran">
                                <div id="employe" className={current == 'Employe' ? 'current dash' : 'dash'}><PeopleIcon className="i-mui" />
                                    Employers Oran
                                </div>
                            </Link>
                            : JSON.parse(localStorage.getItem('admin')).role == 'bejaia' ?
                                <Link to="/employers/bejaia">
                                    <div id="employe" className={current == 'Employe' ? 'current dash' : 'dash'}><PeopleIcon className="i-mui" />
                                        Employers Bejaia
                                    </div>
                                </Link>
                                : null}
                {/* <Link to="/employers">
                    <div id="employe" className={current == 'Employe' ? 'current dash' : 'dash'}><PeopleIcon className="i-mui" />
                        Employes
                    </div>
                </Link>

                <Link to="/documents">
                    <div className={current == 'manageDocuments' ? 'current dash' : 'dash'}><DescriptionIcon className="i-mui" />
                        Gestion Documents
                    </div>
                </Link>
                <Link to="/accounts">
                    <div className={current == 'manageAccounts' ? 'current dash' : 'dash'}><ManageAccountsIcon className="i-mui" />
                        Gestion Accounts
                    </div>
                </Link>
                <Link to="/reclamations">
                    <div className={current == 'manageReclamations' ? 'current dash' : 'dash'}><ReportProblemIcon className="i-mui" />
                        Gestion Reclamations
                    </div>
                </Link>
                <Link to="/trash">
                    <div className={current == 'Trash' ? 'current dash' : 'dash'}><RestoreFromTrashIcon className="i-mui" />
                        Trash
                    </div>
                </Link> */}
                <div className="dash" onClick={logout}><MeetingRoomIcon className="i-mui" />
                    Logout
                </div>
                <footer>
                    <p>&copy; 2021 Erenav.</p>
                </footer>
            </div>
        </>
    )
}



export default NavAddEmploye
