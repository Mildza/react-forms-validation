import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState(
    { username: "", password: "" }
  )
  const [errors, setErrors] = useState({ username: '', password: '', touched: false })
  const [formValid, setFormValid] = useState(true)
  validate(values, errors)

  const handleChange = event => {
    const { name, value } = event.target
    setValues((values) => {
      return {
        ...values,
        [name]: value
      }
    })
  }

  const validateForm = (errors) => {
    if (errors.dirty &&
      errors.username.trim().length === 0 &&
      errors.password.trim().length === 0) {
      setFormValid(false)
    } else setFormValid(true)
  }

  useEffect(() => {
    setErrors(validate(values, errors))
    // callback()
    validateForm(errors)
  }, [values, errors, validate, validateForm])

  return { handleChange, values, errors, formValid }
}

export default useForm;

