import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import AddUser from './Forms/AddUser'
import ConfigUser from './Forms/ConfigUser'
import EditUser from './Forms/EditUser'

function User() {
    const [users, setUsers]= useState([])
    const [user,setUser]= useState({})
    const [delId,setDelId]= useState('')
    const [userId,setUserId]= useState('')

    const token= localStorage.getItem("token")


    const getUser = async () =>{
        const response = await axios.get('/user',{
            headers: {'authorization' : 'Bearer '+token}
        })
        setUsers(response.data.data)
    }

    useEffect(()=>{
        getUser()
    })

    const getUserById = async (id) =>{
        const response = await axios.get(`/user/${id}`,{
        headers: {'authorization' : 'Bearer '+token}
    })
    setUser(response.data.data)
    }

    const deleteMsg =(id)=>{
        setDelId(id)
    }

    const deleteUser =async () =>{
        await axios.delete(`/user/${delId}`,{
            headers: {'authorization' : 'Bearer '+token}
        }) 
    }
  return (
    <>
    <div id="page-content-wrapper">
            <div className="container-fluid px-4">
                <div className="row my-5">
                    <h3 className="fs-4 mb-3">User Details</h3>
                    
                    <div className='my-4 d-grid gap-2 d-md-flex justify-content-md-end'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUser">
                        <i className='fa fa-plus '>  Add User</i>
                        </button>
                    </div>

                    <div className="col">
                        <table className="table bg-white rounded shadow-sm">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">S.N.</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { users.length>0? users.map((user,i)=>(
                                <tr key={user.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    <button type="button" onClick={()=>getUserById(user.id)} className="btn" data-bs-toggle="modal" data-bs-target="#editUser">
                                        <i className='fa fa-pen'></i>
                                    </button>    
                                    <button type="button" className="btn" onClick={()=>deleteMsg(user.id)} data-bs-toggle="modal" data-bs-target="#deleteUser">
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    <button type="button" onClick={()=>setUserId(user.id)} className="btn" data-bs-toggle="modal" data-bs-target="#configUser">
                                        <i className='fa fa-cog'></i>
                                    </button>
                                    </td>
                                </tr>
                                )): <tr>
                                <th scope="row">0</th>
                                <td>Not Found</td>
                                <td>Not Found</td>
                                <td>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#editUser">
                                    <i className='fa fa-pen me-4'></i>
                                </button>    
                                <button type="button" className="btn"  data-bs-toggle="modal" data-bs-target="#deleteUser">
                                    <i className='fa fa-trash'></i>
                                </button>
                                </td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* add user modal */}
                    <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <AddUser token={token}/>
                    </div>

                    {/* edit user modal */}
                    <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <EditUser token={token} name={user.name} email={user.email} id={user.id}/>
                    </div>

                    {/* delete user modal */}
                    <div className="modal fade" id="deleteUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               
                                <div className="justify-item-center">
                                    <p>Are you sure you want to delete this User?</p>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onClick={deleteUser} className="btn btn-primary">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* config user modal */}
                    <div className="modal fade" id="configUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <ConfigUser token={token} userId={userId}/>
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}

export default User