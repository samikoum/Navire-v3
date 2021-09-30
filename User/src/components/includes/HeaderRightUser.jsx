import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';

function HeaderRightUser() {
    return (
        <>
            <div className="coll-2-header-right">
                <NotificationsIcon className="i-notif" />
                <img src="/images/userRv.png" className="img-user" />
                <p>{JSON.parse(localStorage.getItem('user')).prenom}</p>
            </div>
        </>
    )
}

export default HeaderRightUser
