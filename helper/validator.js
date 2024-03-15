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

export const validateSignIn = (data) => {
  const { password, email } = data;
  const errors = {};
  if (!email || (email && !isEmail(email)))
    errors.email = "Veuillez entrer votre mail";
  if (!password) errors.password = "Veuillez entre un mot de passe";

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};

/* create event */
export const validateCreateEvent = (data) => {
  const { title, country, city, dateStart, dateEnd, typeEvent, ctgEvent } =
    data;
  const errors = {};
  if (!title) errors.title = "Veuillez renseigner ce champs";
  if (country?.length<=0 || country===undefined) errors.country = "Veuillez renseigner ce champs";
  if (city?.length<=0 || city===undefined) errors.city = "Veuillez renseigner ce champs";
  if (!dateStart) errors.dateStart = "Veuillez renseigner ce champs";
  if (!dateEnd) errors.dateEnd = "Veuillez renseigner ce champs";
  if (!typeEvent) errors.typeEvent = "Veuillez renseigner ce champs";
  if (!ctgEvent) errors.ctgEvent = "Veuillez renseigner ce champs";
  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};

/* ticket */
export const validateCreateTicket = (data) => {
  const { status,nombre_de_billet_standart, prix_de_billet_standart,nombre_de_billet_vip,prix_de_billet_vip } = data;
  const errors = {};
  if (status=="Payant" && !nombre_de_billet_standart)
    errors.nombre_de_billet_standart = "Veuillez entrer votre mail";
    if (status=="Payant" && !prix_de_billet_standart)
    errors.prix_de_billet_standart = "Veuillez entrer votre mail";
    if (status=="Payant" && !nombre_de_billet_vip)
    errors.nombre_de_billet_vip = "Veuillez entrer votre mail";
    if (status=="Payant" && !prix_de_billet_vip)
    errors.prix_de_billet_vip = "Veuillez entrer votre mail";

  return {
    valid: Object.keys(errors).length > 0 ? false : true,
    errors,
  };
};
