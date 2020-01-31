
export default function validate(values, errors) {

  if (values.username.trim().length > 0
    || values.password.trim().length > 0) {
    errors.dirty = true;
  }
  if (values.username.trim().length === 0) {
    errors.username = "Username is required";
  } else if (values.username.trim().length < 4) {
    errors.username = "Username must be more than 4 characters";
  } else { errors.username = ""; }
  if (!values.email) {
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (values.password.trim().length === 0) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  } else { errors.password = ""; }
  return errors
}





