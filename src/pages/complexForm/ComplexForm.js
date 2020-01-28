import React, {useState, useReducer, useCallback} from 'react'

import Button from '../../components/button/Button'

import './ComplexForm.scss'
import Input from '../../components/input/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from './../../components/input/validators';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        console.log(inputId, action.inputId);
        
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const ComplexForm = () => {
  
  const [toggle, setToggle] = useState(false)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      firstname: {
        value: '',
        isValid: false
      },
      lastname: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const submitHandler = event => {
    event.preventDefault();
    if(toggle) {
      
    }
    console.log(formState.inputs);
  };

  return (
    <div className="complex">
       <Button element="input" color="green" onClick={()=>setToggle(false)}>Login</Button>
       <Button type="submit" element="input" onClick={()=>setToggle(true)} golden>Register</Button>
       <form className={`${toggle ? 'login' : 'register' }`} onSubmit={submitHandler}>
       <div>   
         {toggle && 
         <>
          <Input   
            id="firstname"
            type="text"
            label="First Name"
            placeholder="First Name"
            errorText="First name is required!"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            />
          <Input   
            id="lastname"
            type="text"
            label="Last Name"
            placeholder="Last Name"
            errorText="Last name is required!"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          </> 
          }
          <Input   
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            errorText="Please enter a valid email."
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input   
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            errorText="Password must be at least 8 characters!"
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
          />
        </div>
        <Button>Sumbit</Button>
       </form>
    </div>
  )
}

export default ComplexForm