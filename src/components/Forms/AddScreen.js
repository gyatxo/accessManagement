import { useFormik } from 'formik'
import React from 'react'
import axios from '../../api/axios'

function AddScreen({token}) {
    const formik = useFormik({
        initialValues:{
            name:'',
            description:''
        },
        validate:values=>{
            let errors = {}
            if(!values.description){
                errors.description = 'Enter a valid description'
            }
            if(!values.name){
                errors.name = 'Enter a name'
            }
            return errors
        },
        onSubmit: async (values, onSubmitProps) => {
            try{
                await axios.post('/screens', values,{
                    headers : {'authorization' : 'Bearer '+token}
                })
                
          }
            catch (err){
              alert(err)
            }
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
        }
        
    })
  return (
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Screen</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    <form className="row g-3" onSubmit={formik.handleSubmit}>
        <div className="modal-body">
            
            <div >
                <label  className="col-sm-2"> Name</label>
                <input type="text"  className="form-control col-sm-4" name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
            </div>
        {formik.touched.name && formik.errors.name? <div className='errors'>{formik.errors.name}</div>:null}
            <div >
                <label htmlFor="desc" className="col-sm-2">Description</label>
                <input type="text" className="form-control col-sm-6" name='description' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.description}  />
            </div>
        {formik.touched.description && formik.errors.description? <div className='errors'>{formik.errors.description}</div>:null}
            
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="submit" className="btn btn-primary">Add</button>
        </div>
    </form>
        </div>
    </div>
  )
}

export default AddScreen