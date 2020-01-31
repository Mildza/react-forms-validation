import React, {useState} from 'react'

import useForm from './useForm'
import validate from './validator'
import './SimpleForm.scss';

const SimpleForm = () => {
  const [submited, setSubmited] = useState(false)
  const { handleChange, values, errors, formValid } = useForm(submit, validate)
  
  function submit(e) {
    e.preventDefault()
    setSubmited(true)
  }
  return (
    <>
      <form className="simpleForm" onSubmit={submit}>
        <div>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input type="text" name="username" id="username" autoComplete="off"
            onChange={handleChange} value={values.username} placeholder="Username" />
          {(errors.username && errors.dirty) ? <p>{errors.username}</p> : null}
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input type="password" name="password" id="password" autoComplete="off"
            onChange={handleChange} value={values.password} placeholder="Password" />
          {(errors.password && errors.dirty) ? <p>{errors.password}</p> : null}
        </div>
        <button disabled={formValid}>Submit</button>
      </form>
      
        {submited && 
        <div className="output">
          <p>Username: <span>{values.username}</span></p>
          <p>Password: <span>{values.password}</span></p>
          </div>
        }
      
      
    </>
  )
}
export default SimpleForm