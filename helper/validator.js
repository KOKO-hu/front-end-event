const isEmpty = (str) => (str && str.trim().length < 1 ? true : false);
const isEmail = (email) => (email.match(/.+@.+\..+/) ? true : false);

export const validateSignUp = (data) => {
  const { password, lastName, firstName, tel, email, categories } = data;
  const errors = {};
  if (!email || (email && !isEmail(email)))
    errors.email = "Veuillez entrer votre mail";
  if (!password) errors.password = "Veuillez entre un mot de passe";
  if (!lastName) errors.lastName = "Veuillez remplir ce champs";
  if (!firstName) errors.firstName = "Veuillez remplir ce champs";
  if (!tel) errors.tel = "Veuillez remplir ce champs";
  if (!categories) errors.categories = "Veuillez remplir ce champs";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};

export const validateSignIn=()=> {
  const { password, email,  } = data;
  const errors = {};
  if (!email || (email && !isEmail(email)))
    errors.email = "Veuillez entrer votre mail";
  if (!password) errors.password = "Veuillez entre un mot de passe";

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};
