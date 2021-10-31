import React, { useContext } from 'react';
import Context from '../../context/Context'
import { useHistory } from 'react-router-dom'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './notifmenu.css'


export default function NotifMenu({ MatriculeNotifcation }) {
    const { NotificationIconClick, setNotificationIconClick } = useContext(Context)

    let history = useHistory()

    const handleRowNotificationClick = () => {
        history.push('/reclamations')
    }

    return (
        <>
            <div className="notif-menu" >
                {MatriculeNotifcation.map(m => (
                    <div>
                        {m.status == 'vu' ?
                            <div className="notification-sender notification-sender-vu" onClick={handleRowNotificationClick}>
                                <AccountCircleIcon className="i-mui-notif" />
                                <h4>{m.matricule} Nouveau Reclamation</h4>
                            </div>
                            :
                            <div className="notification-sender" onClick={handleRowNotificationClick}>
                                <AccountCircleIcon className="i-mui-notif" />
                                <h4>{m.matricule} Nouveau Reclamation</h4>
                            </div>}
                    </div>
                ))}

            </div>
        </>
    );

}