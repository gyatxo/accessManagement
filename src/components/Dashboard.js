import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Dashboard() {
        const navigate = useNavigate()
  return (
    <>

    <div className="d-flex" id="wrapper">
        <div className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                    className="fas fa-user-secret me-2"></i>Dashboard</div>
            <div className="list-group list-group-flush my-3">
                <h1>HOME</h1>
                <h2>USER SETTINGS</h2>
                <Link to={'user'} className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-users me-2"></i>Create User</Link>
                <Link to={'roles'} className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-tasks me-2"></i>Role Setting</Link>
                <Link to={'screen'} className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        className="fas fa-desktop me-2"></i>Screen Setup</Link>
                <button onClick={()=> {
                        localStorage.clear()
                        navigate('/')
                }} className='btn list-group-item list-group-item-action bg-transparent text-danger fw-bold' ><i className='fa fa-power-off'>    Log Out</i></button>
            </div>
        </div>

        <Outlet />
        
    </div>

  </>
  )
}

export default Dashboard