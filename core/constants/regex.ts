// const MOBILE_REG = /^(\+98|0)?9\d{9}$/g;
export const PHONE_NUMBER_REG = /^09\d{9}$/g;
export const MOBILE_REG =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
// const MOBILE_REG = /[0-9]{9}/;
export const CARD_SERIAL_NUMBER_REG = /[a-zA-Z0-9]$/;
export const PASSWORD_REG =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const PASSWORD_REG__8CHAR = /^.{8,}$/;
export const PASSWORD_REG__TYPE = /^(?=.*[A-Za-z])(?=.*\d)/;
export const PASSWORD_REG__CASE_SENSE = /^(?=.*[a-z])(?=.*[A-Z])/;
export const PERSIAN_REG = /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/;
