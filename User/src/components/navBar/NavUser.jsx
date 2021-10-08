import React, { useContext } from 'react'
import Context from "../../context/Context"
import { Link, useHistory } from 'react-router-dom'
// icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import MenuIcon from '@mui/icons-material/Menu';



function NavUser({ current }) {
    const { handleCloseMenu, iconCloseMenu, setIsAuth } = useContext(Context);
    let history = useHistory()

    const logout = () => {
        localStorage.removeItem('user')
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
                <Link to="/documents">
                    <div className={current == 'Document' ? 'current dash' : 'dash'}><DescriptionIcon className="i-mui" />
                        Documents
                    </div>
                </Link>
                <Link to="/parcours">
                    <div className={current == 'Parcour' ? 'current dash' : 'dash'}><WorkIcon className="i-mui" />
                        Parcour
                    </div>
                </Link>
                <Link to="/reclamation">
                    <div className={current == 'Reclamation' ? 'current dash' : 'dash'}><AnnouncementIcon className="i-mui" />
                        Reclamation
                    </div>
                </Link>
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

export default NavUser
