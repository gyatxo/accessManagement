import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import AddRole from './Forms/AddRole'
import ConfigRole from './Forms/ConfigRole'
import EditRole from './Forms/EditRole'

function Roles() {
    const [roles,setRoles]= useState([])
    const [role,setRole]= useState({})
    const [delId,setDelId]= useState('')
    const [configId,setConfigId]= useState('')


    const token= localStorage.getItem("token")

    const getRoleById = async (id) =>{
        const response = await axios.get(`/roles/${id}`,{
        headers: {'authorization' : 'Bearer '+token}
    })
    setRole(response.data.data)
    }

    const getRole = async () =>{
        const response = await axios.get('/roles',{
            headers: {'authorization' : 'Bearer '+token}
        })
        setRoles(response.data.data)
    }
    useEffect(()=>{
        getRole()
    })

    const deleteRole =async () =>{
         await axios.delete(`/roles/${delId}`,{
            headers: {'authorization' : 'Bearer '+token}
        }) 
    }

  return (
    <>
    <div id="page-content-wrapper">
            <div className="container-fluid px-4">
                <div className="row my-5">
                    <h3 className="fs-4 mb-3">Role Details</h3>
                    
                    <div className='my-4 d-grid gap-2 d-md-flex justify-content-md-end'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRole">
                        <i className='fa fa-plus '>  Add Role</i>
                        </button>
                    </div>

                    <div className="col">
                        <table className="table bg-white rounded shadow-sm">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">S.N.</th>
                                    <th scope="col">Role Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.length>0? roles.map((role,i)=>(

                                    <tr key={role.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{role.name}</td>
                                    <td>{role.description}</td>
                                    <td>
                                    <button type="button" onClick={()=>getRoleById(role.id)} className="btn" data-bs-toggle="modal" data-bs-target="#editRole">
                                        <i className='fa fa-pen'></i>
                                    </button>    
                                    <button type="button" className="btn" onClick={()=> setDelId(role.id)} data-bs-toggle="modal" data-bs-target="#deleteRole">
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    <button type="button" onClick={()=>setConfigId(role.id)} className="btn" data-bs-toggle="modal" data-bs-target="#configRole">
                                        <i className='fa fa-cog'></i>
                                    </button>
                                    </td>
                                </tr>
                                    )): <tr>
                                    <th scope="row">1</th>
                                    <td>Role</td>
                                    <td>This is role 1</td>
                                    <td>
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#editRole">
                                        <i className='fa fa-pen'></i>
                                    </button>    
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#deleteRole">
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#configRole">
                                        <i className='fa fa-cog'></i>
                                    </button>
                                    </td>
                                </tr>
                                }
                                
                            </tbody>
                        </table>
                    </div>

                    {/* add role modal */}
                    <div className="modal fade" id="addRole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <AddRole token={token} />
                    </div>

                    {/* edit role modal */}
                    <div className="modal fade" id="editRole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <EditRole token={token} id={role.id} name={role.name} description={role.description} />
                    </div>

                    {/* delete role modal */}
                    <div className="modal fade" id="deleteRole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Role</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               
                                <div className="justify-item-center">
                                    <p>Are you sure you want to delete this Role?</p>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onClick={deleteRole} className="btn btn-primary">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* configure role modal */}
                    <div className="modal fade" id="configRole" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <ConfigRole token={token} id={configId}/>
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}

export default Roles