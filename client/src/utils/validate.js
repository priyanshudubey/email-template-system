export const validation = (values) => {
  let error = {};

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  console.log("values received: ", values);

  if (!values.email) {
    error.email = "Email should not be empty";
  } else if (!isEmailValid.test(values.email)) {
    error.email = "Invalid email";
  }

  if (!values.password) {
    error.password = "Password should not be empty";
  } else if (!isPasswordValid.test(values.password)) {
    error.password =
      "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return error;
};

export const validatePasswordsMatch = (password, confirmPassword) => {
  let error = {};

  if (password !== confirmPassword) {
    error.confirmPassword = "Passwords do not match";
  }

  return error;
};
