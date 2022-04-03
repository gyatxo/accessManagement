import React, { useState } from 'react'
import makeAnimated from 'react-select/animated'
import AsyncSelect from 'react-select/async';
import axios from '../../api/axios'
function ConfigUser({token}) {
    const [roleId,setRoleId]=useState('')


    
    // const assignRoleUser= async ()=>{
    //     const res = await axios.post('/user/role/map',{userId,roleId},{
    //         headers:{'authorization' : 'Bearer '+token}
    //     })
    //     console.log(res)
    // }

    const getRole = async () =>{
        const response = await axios.get('/roles',{
            headers: {'authorization' : 'Bearer '+token}
        })
        const data = response.data.data
        return data
    }

    const animatedSelect = makeAnimated();
    
      const handleChange=(values)=>{
          const [newId] = values.map(role=>role.id)
          setRoleId(newId)
          console.log(roleId)
      }
  return (
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Assign Role to User</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            
            
                <AsyncSelect
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedSelect}
                    cacheOptions
                    defaultOptions
                    getOptionLabel={e=>e.name}
                    getOptionValue={e=>e.id}
                    loadOptions={getRole}
                    onChange={handleChange}
                />
                
            
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary">Add</button>
        </div>
        </div>
    </div>
  )
}

export default ConfigUser