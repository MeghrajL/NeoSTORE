function validateEmail(email: string) {
  //   console.log(email);
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   console.log(validRegex.test(email.toLowerCase()));
  return validRegex.test(email.toLowerCase());
}

function validatePassword(password: string) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  //console.log(passwordRegex.test(password));
  return passwordRegex.test(password);
}

function validatePhone(phnNum: string) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phnNum);
}

function validateName(name: string) {
  const nameRegex = /^[a-zA-Z'\-]+$/;
  return nameRegex.test(name);
}

export {validateEmail, validatePassword, validatePhone, validateName};
