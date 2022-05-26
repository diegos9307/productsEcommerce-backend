import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import pkg from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const { body } = pkg;
const router = Router();

router.post(
  "/register",
  [
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
    body("terms", "Formato username es incorrecto").isBoolean()
  ],
  validationResultExpress,
  register
);

router.post(
  "/login",
  [body("email", "Formato de email incorrecto").trim().isEmail().normalizeEmail()],
  validationResultExpress,
  login
);

export default router;
