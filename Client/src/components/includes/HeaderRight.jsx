import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/Context'
import axios from 'axios';

import NotifMenu from './NotifMenu';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

import { io } from 'socket.io-client'

const socket = io(`http://localhost:3001`)


function HeaderRight() {
    const { handleClickMenu, iconMenu } = useContext(Context);
    const [MatriculeNotifcation, setMatriculeNotifcation] = useState([])
    const { NotificationIconClick, setNotificationIconClick, notifIcon } = useContext(Context)
    const { isCall, setIsCall } = useContext(Context)
    const [CountNotification, setCountNotification] = useState(0)


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/reclamations/notifications/count`).then((response) => {
            setCountNotification(response.data[1][0].count)
            setMatriculeNotifcation(response.data[0])
        })
        socket.on('message', (data) => {
            setIsCall(!isCall)
            setMatriculeNotifcation(data[0])
            setCountNotification(data[1][0].count)
        })
    }, [isCall])

    return (
        <>
            <div className="coll-2-header">
                <MenuIcon className="i-mui" ref={iconMenu} onClick={handleClickMenu} />
                <div className="coll-2-header-right">
                    <Badge
                        color="error"
                        badgeContent={CountNotification}
                        max={100}
                        className="i-notif"
                        onClick={() => setNotificationIconClick(!NotificationIconClick)}
                        ref={notifIcon}
                    >
                        <NotificationsIcon />
                    </Badge>
                    <img src="/images/adminRv.png" />
                    <p>Admin</p>
                    {NotificationIconClick ?
                        <NotifMenu
                            MatriculeNotifcation={MatriculeNotifcation}
                        />
                        : null}
                </div>
            </div>
        </>
    )
}

export default HeaderRight
