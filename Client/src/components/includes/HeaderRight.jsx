import React, { useContext } from 'react'
import Context from '../../context/Context'

import MenuIcon from '@mui/icons-material/Menu';

function HeaderRight() {
    const { handleClickMenu, iconMenu } = useContext(Context);
    return (
        <>
            <div className="coll-2-header">
                <MenuIcon className="i-mui" ref={iconMenu} onClick={handleClickMenu} />
                <div className="coll-2-header-right">
                    <i className="fas fa-bell"></i>
                    <img src="/images/adminRv.png" />
                    <p>Admin</p>
                </div>
            </div>
        </>
    )
}

export default HeaderRight
