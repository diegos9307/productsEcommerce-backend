import { validationResult, body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const bodyRegisterValidator = [
  body("username", "Formato username es incorrecto").custom((value) => {
    return value.match(/^[A-Za-z ]+$/);
  }),
  body("email", "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
  body(
    "password",
    "La contraseña debe tener mínimo 8 carácteres, 1 letra mayúscula, 1 símbolo y 1 número"
  )
    .trim()
    .isStrongPassword(),
  body("terms", "Formato terms es incorrecto").isBoolean(),
  validationResultExpress
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto").trim().isEmail().normalizeEmail(),
  validationResultExpress
];
