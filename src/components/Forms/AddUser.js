import { useFormik } from 'formik'
import React from 'react'
import axios from '../../api/axios'


function AddUser({token}) {
    const formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:''
        },
        validate:values=>{
            let errors = {}
            if(!values.email){
                errors.email = 'Enter a valid email'
            }
            if(!values.name){
                errors.name = 'Enter a name'
            }
            if(!values.password){
                errors.password = 'Enter a password'
            }
            return errors
        },
        onSubmit: async (values, onSubmitProps) => {
            try{
                await axios.post('/user', values,{
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
        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
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
            <label  className="col-sm-2">Email</label>
            <input type="email" className="form-control col-sm-6"  name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
        </div>
        {formik.touched.email && formik.errors.email? <div className='errors'>{formik.errors.email}</div>:null}
        <div >
            <label  className="col-sm-2">Password</label>
            <input type="password" className="form-control col-sm-6" name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
        </div>
        {formik.touched.password && formik.errors.password? <div className='errors'>{formik.errors.password}</div>:null}
        
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

export default AddUser