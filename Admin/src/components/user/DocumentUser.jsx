import React, { useEffect, useContext } from 'react'
import Context from '../../context/Context'
import NavUser from '../navBar/NavUser';
import HeaderRightUser from '../includes/HeaderRightUser';

import MenuIcon from '@mui/icons-material/Menu';
import './user.css'

function DocumentUser() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);

    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
    }, [])

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
                        <div className="docs">
                            <div className="doc">
                                <p>this Document is about Richard</p>
                                <i className="fas fa-file-pdf"></i>
                            </div>
                            <div className="doc">
                                <p>this Document is about Richard</p>
                                <i className="fas fa-file-pdf"></i>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DocumentUser
