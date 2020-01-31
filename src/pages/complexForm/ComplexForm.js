import React, {
  useState,
  useReducer,
  useCallback,
  useRef,
  useEffect
} from "react";

import Button from "../../components/button/Button";

import "./ComplexForm.scss";
import Input from "../../components/input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL
} from "./../../components/input/validators";
import { loginState, registerState } from "./initValues";

const formReducer = (state, action) => {
  if (action.type === "REGISTER") {
    state = {};
    state = registerState;
  }
  if (action.type === "LOGIN") {
    state = {};
    state = loginState;
  }

  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
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
  const [toggle, setToggle] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [state, dispatch] = useReducer(formReducer, loginState);
  const scrollEmail = useRef();

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const submitHandler = event => {
    event.preventDefault();
    setSubmited(true);
  };

  useEffect(() => {
    if (scrollEmail.current) {
      window.scrollTo({
        behavior: "smooth",
        top: scrollEmail.current.offsetTop
      });
    }
  }, [submited]);

  const login = () => {
    setToggle(false);
    dispatch({
      type: "LOGIN"
    });
    setSubmited(false);
  };
  const register = () => {
    setToggle(true);
    dispatch({
      type: "REGISTER"
    });
    setSubmited(false);
  };

  return (
    <div className="complex">
      <Button element="input" color="green" onClick={login}>
        Login
      </Button>
      <Button type="submit" element="input" onClick={register} golden>
        Register
      </Button>
      <form
        className={`${toggle ? "login" : "register"}`}
        onSubmit={submitHandler}
      >
        <div>
          {toggle && (
            <>
              <Input
                id="firstname"
                type="text"
                label="First Name"
                placeholder="First Name"
                errorText="First name is required!"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                reset={toggle}
              />
              <Input
                id="lastname"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                errorText="Last name is required!"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                reset={toggle}
              />
            </>
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Email"
            errorText="Please enter a valid email."
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            reset={toggle}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Password"
            errorText="Password must be at least 8 characters!"
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
            reset={toggle}
          />
        </div>
        <Button disabled={!state.isValid}>Sumbit</Button>
      </form>

      {submited && (
        <>
          {state.inputs.firstname ? (
            <p>
              First name: <span>{state.inputs.firstname.value}</span>
            </p>
          ) : null}
          {state.inputs.lastname ? (
            <p>
              Last Name: <span>{state.inputs.lastname.value}</span>
            </p>
          ) : null}
          <p ref={scrollEmail}>
            email: <span>{state.inputs.email.value}</span>
          </p>
          <p>
            password: <span>{state.inputs.password.value}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default ComplexForm;
