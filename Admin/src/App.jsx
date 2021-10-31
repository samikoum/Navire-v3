import React, { useRef, useState } from 'react';
import Context from './context/Context'
import './App.css';

import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import Employe from './components/Employe';
import ManageDocuments from './components/ManageDocuments'
import ManageAccounts from './components/ManageAccounts';
import ManageReclamations from './components/ManageReclamations'
import Trash from './components/Trash';
import NotFound from './components/includes/NotFound';

// Login
import Login from './components/login/Login'

// add
import AddEmploye__1 from './components/add/AddEmploye__1';
import AddEmploye__2 from './components/add/AddEmploye__2';
import AddEmploye__3 from './components/add/AddEmploye__3';
import AddEmploye__4 from './components/add/AddEmploye__4';
import AddEmploye__5 from './components/add/AddEmploye__5';
import AddEmploye__6 from './components/add/AddEmploye__6';
import AddEmploye__7 from './components/add/AddEmploye__7';
import AddEmploye__8 from './components/add/AddEmploye__8';

// protected Routed
import ProtectedLogin from './components/protectedRoutes/ProtectedLogin';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import ProtectedRoute2 from './components/protectedRoutes/ProtectedRoute2';

// Update
import UpdateEmploye from './components/update/UpdateEmploye';
import UpdateEmploye__1 from './components/update/UpdateEmploye__1';
import UpdateEmploye__2 from './components/update/UpdateEmploye__2';
import UpdateEmploye__3 from './components/update/UpdateEmploye__3';
import UpdateEmploye__4 from './components/update/UpdateEmploye__4';
import UpdateEmploye__5 from './components/update/UpdateEmploye__5';
import UpdateEmploye__6 from './components/update/UpdateEmploye__6';
import UpdateEmploye__7 from './components/update/UpdateEmploye__7';
import UpdateEmploye__8 from './components/update/UpdateEmploye__8';

// View Employe
import ViewEmploye from './components/view/ViewEmploye';
import ViewMessage from './components/view/ViewMessage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Employes Components
import EmployeAlger from './components/employes/EmployeAlger';
import EmployeOran from './components/employes/EmployeOran';
import EmployeBejaia from './components/employes/EmployeBejaia';

import ProfileUser from './components/user/ProfileUser'

import './responsive.css'
function App() {

  // useState
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'))
  const [isX, setIsX] = useState(localStorage.getItem('isX'))
  const [loader, setLoader] = useState(false)
  console.log(isAuth)
  console.log(isX)

  const [isCall, setIsCall] = useState(false)
  const [NotificationIconClick, setNotificationIconClick] = useState(false)
  const notifIcon = useRef(null)

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
  const modelAddDocument = useRef(null)
  const overlayPassword = useRef(null)


  const step__1 = useRef(null)
  const step__2 = useRef(null)
  const step__3 = useRef(null)
  const step__4 = useRef(null)
  const step__5 = useRef(null)
  const step__6 = useRef(null)
  const step__7 = useRef(null)
  const step__8 = useRef(null)

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
          isAuth, setIsAuth, isX, setIsX,
          roww, coll__1, coll__2, handleClickMenu, iconMenu, iconCloseMenu, handleCloseMenu,
          step__1, step__2, step__3, step__4, step__5, step__6, step__7, step__8,
          loader, setLoader, btnNext, modelAddDocument,
          btnShowModel, overlay, overlayAdd, overlayUpdate, overlayPassword, btnClose, btnCancel,
          NotificationIconClick, setNotificationIconClick, notifIcon, isCall, setIsCall
        }}>
        <Router>
          <Switch>
            <ProtectedLogin
              exact
              path="/"
              component={Login}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            {/*--------Dashboard-------- */}
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />

            <ProtectedRoute
              exact
              path="/employers/alger"
              component={EmployeAlger}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employers/oran"
              component={EmployeOran}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employers/bejaia"
              component={EmployeBejaia}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />

            <ProtectedRoute
              exact
              path="/employers"
              component={Employe}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/documents"
              component={ManageDocuments}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/accounts"
              component={ManageAccounts}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/reclamations"
              component={ManageReclamations}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/trash"
              component={Trash}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />

            {/*---------add__x------------*/}
            <ProtectedRoute
              exact
              path="/add__1"
              component={AddEmploye__1}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute2
              exact
              path="/add__2"
              component={AddEmploye__2}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={2}
            />
            <ProtectedRoute2
              exact
              path="/add__3"
              component={AddEmploye__3}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={3}
            />
            <ProtectedRoute2
              exact
              path="/add__4"
              component={AddEmploye__4}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={4}
            />
            <ProtectedRoute2
              exact
              path="/add__5"
              component={AddEmploye__5}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={5}
            />
            <ProtectedRoute2
              exact
              path="/add__6"
              component={AddEmploye__6}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={6}
            />
            <ProtectedRoute2
              exact
              path="/add__7"
              component={AddEmploye__7}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={7}
            />
            <ProtectedRoute2
              exact
              path="/add__8"
              component={AddEmploye__8}
              isX={isX}
              setIsX={setIsX}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
              valueisX={8}
            />

            {/*---------update__x---------*/}
            <ProtectedRoute
              exact
              path="/employe/update/:id"
              component={UpdateEmploye}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__1/:id"
              component={UpdateEmploye__1}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__2/:id"
              component={UpdateEmploye__2}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__3/:id"
              component={UpdateEmploye__3}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__4/:id"
              component={UpdateEmploye__4}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__5/:id"
              component={UpdateEmploye__5}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__6/:id"
              component={UpdateEmploye__6}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__7/:id"
              component={UpdateEmploye__7}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/employe/update__8/:id"
              component={UpdateEmploye__8}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />

            {/* ------------view-------------*/}
            <ProtectedRoute
              exact
              path="/employe/:id"
              component={ViewEmploye}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <ProtectedRoute
              exact
              path="/reclamations/:id"
              component={ViewMessage}
              isAuth={isAuth}
              setIsAuth={setIsAuth}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Context.Provider>
    </>
  );
}

export default App;
