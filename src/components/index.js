import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import ScreenSetup from './ScreenSetup'
import Roles from './Roles'
import User from './User'

function Main() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} >
            <Route path='user' element={<User />} />
            <Route path='roles' element={<Roles />} />
            <Route path='screen' element={<ScreenSetup />} />
        </Route>
    </Routes>
    </>
  )
}

export default Main