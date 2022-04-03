import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import makeAnimated from 'react-select/animated'
import axios from '../../api/axios'
function ConfigRole({id,token}) {

    const mapping ={
        screen: {
            create: true
        }
    }

    const getScreen = async () =>{
        const response = await axios.get('/screens',{
            headers: {'authorization' : 'Bearer '+token}
        })
        const data =response.data.data
        return data
    }

    const mapScreen = async ()=>{
        await axios.post('/roles/screen/mapping',{id,mapping},{
            headers:{'authorization' : 'Bearer '+token}
        })
    }
    const animatedSelect = makeAnimated()

    const handleChange =(values)=>{
        console.log(values)
    }

    const privilegeOptions = [
        { value: 'create', label: 'Create' },
        { value: 'add', label: 'Add' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' }
    ]

  return (
<div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Screen Privilege</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div className="modal-body">
        
        <div className="row">
            <div className='col-md-5'>
            <AsyncSelect
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedSelect}
                    cacheOptions
                    defaultOptions
                    getOptionLabel={e=>e.name}
                    getOptionValue={e=>e.id}
                    loadOptions={getScreen}
                    onChange={handleChange}
                />
            </div>
            <div className='col-md-5'>
            <Select
                closeMenuOnSelect={false}
                components={animatedSelect}
                isMulti
                options={privilegeOptions}
                />
            </div>
            <div className='col-md-2'>
                <button onClick={mapScreen} className='btn btn-primary'>Add</button>
            </div>
        </div>
        
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Add</button>
    </div>
    </div>
</div>
  )
}

export default ConfigRole