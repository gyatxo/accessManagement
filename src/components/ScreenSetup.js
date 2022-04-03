import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import AddScreen from './Forms/AddScreen'
import EditScreen from './Forms/EditScreen'

function ScreenSetup() {
    const [screens,setScreens]= useState([])
    const [screen,setScreen]= useState({})
    const [delId,setDelId]= useState('')

    const token= localStorage.getItem("token")

    const getScreenById = async (id) =>{
        const response = await axios.get(`/screens/${id}`,{
        headers: {'authorization' : 'Bearer '+token}
    })
    setScreen(response.data.data)
    }

    const getScreen = async () =>{
        const response = await axios.get('/screens',{
            headers: {'authorization' : 'Bearer '+token}
        })
        setScreens(response.data.data)
    }

    useEffect(()=>{
        getScreen()
    })

    const deleteScreen =async () =>{
        await axios.delete(`/screens/${delId}`,{
            headers: {'authorization' : 'Bearer '+token}
        }) 
    }

  return (
    <>
    <div id="page-content-wrapper">
            <div className="container-fluid px-4">
                <div className="row my-5">
                    <h3 className="fs-4 mb-3">Screen Details</h3>
                    
                    <div className='my-4 d-grid gap-2 d-md-flex justify-content-md-end'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addScreen">
                        <i className='fa fa-plus '>  Add Screen</i>
                        </button>
                    </div>

                    <div className="col">
                        <table className="table bg-white rounded shadow-sm">
                            <thead>
                                <tr>
                                    <th scope="col" width="50">S.N.</th>
                                    <th scope="col">Screen Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screens.length>0? screens.map((screen,i)=>(
                                <tr key={screen.id}>
                                 <th scope="row">{i+1}</th>
                                 <td>{screen.name}</td>
                                 <td>{screen.description}</td>
                                 <td>
                                 <button type="button" onClick={()=>getScreenById(screen.id)} className="btn" data-bs-toggle="modal" data-bs-target="#editScreen">
                                     <i className='fa fa-pen me-4'></i>
                                 </button>    
                                 <button type="button" onClick={()=> setDelId(screen.id)} className="btn" data-bs-toggle="modal" data-bs-target="#deleteScreen">
                                     <i className='fa fa-trash'></i>
                                 </button>
                                 </td>
                             </tr>   
                                )) :
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Not found</td>
                                    <td>Not found</td>
                                    <td>
                                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#editScreen">
                                        <i className='fa fa-pen me-4'></i>
                                    </button>    
                                    <button type="button"  className="btn" data-bs-toggle="modal" data-bs-target="#deleteScreen">
                                        <i className='fa fa-trash'></i>
                                    </button>
                                    </td>
                                </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* add screen modal */}
                    <div className="modal fade" id="addScreen" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <AddScreen token={token}/>
                    </div>

                    {/* edit screen modal */}
                    <div className="modal fade" id="editScreen" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <EditScreen token={token} name={screen.name} description={screen.description} id={screen.id} />
                    </div>

                    {/* delete screen modal */}
                    <div className="modal fade" id="deleteScreen" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Screen</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                               
                                <div className="justify-item-center">
                                    <p>Are you sure you want to delete this Screen?</p>
                                </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" onClick={deleteScreen} className="btn btn-primary">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}

export default ScreenSetup