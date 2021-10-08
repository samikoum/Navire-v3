import React, { useRef, useState } from 'react';
import Context from './context/Context'
import './App.css';

// User Components
import LoginUser from './components/login/LoginUser'
import ProfileUser from './components/user/ProfileUser';
import DashboardUser from './components/user/DashboardUser'
import DocumentUser from './components/user/DocumentUser'
import ParcourUser from './components/user/ParcourUser';
import ReclamationUser from './components/user/ReclamationUser'

// protected Routed
import ProtectedLogin from './components/ProtectedRoutes/ProtectedLogin';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'


// View Employe
// import ViewEmploye from './components/view/ViewEmploye';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './responsive.css'
function App() {


  // useState
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [loader, setLoader] = useState(false)
  console.log(isAuth)


  // useRef
  const roww = useRef(null)
  const coll__1 = useRef(null)
  const coll__2 = useRef(null)
  const iconMenu = useRef(null)
  const iconCloseMenu = useRef(null)
  const btnNext = useRef(null)

  const btnShowModel = useRef(null)
  const overlayAdd = useRef(null)
  const overlayUpdate = useRef(null)
  const overlay = useRef(null)
  const btnClose = useRef(null)
  const btnCancel = useRef(null)



  // useEffect
  // useEffect(() => {
  //   console.log(roww.current.offsetHeight)
  //   console.log(window.innerHeight)

  //   if (roww.current !== null) {
  //     if (roww.current.offsetHeight < window.innerHeight) {
  //       roww.current.style.height = '100vh'
  //     }
  //   }
  // }, [])


  const handleClickMenu = () => {
    coll__1.current.style.display = 'block'
    coll__2.current.style.width = '100%'
    coll__2.current.style.marginLeft = '235px'
    iconMenu.current.style.display = 'none'
    console.log('Open Menu')
  }

  const handleCloseMenu = () => {
    coll__1.current.style.display = 'none'
    coll__2.current.style.width = '100%'
    coll__2.current.style.marginLeft = '0'
    iconMenu.current.style.display = 'block'
    console.log('Close Menu')
  }



  return (
    <>
      <Context.Provider
        value={{
          isAuth, setIsAuth,
          roww, coll__1, coll__2, handleClickMenu, iconMenu, iconCloseMenu, handleCloseMenu,
          loader, setLoader, btnNext,
          btnShowModel, overlay, overlayAdd, overlayUpdate, btnClose, btnCancel
        }}>
        <Router>
          <Switch>
            {/*----------User--------------*/}
            <ProtectedLogin
              exact
              path="/"
              component={LoginUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfileUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={DashboardUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/documents"
              component={DocumentUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/parcours"
              component={ParcourUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/reclamation"
              component={ReclamationUser}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
          </Switch>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
