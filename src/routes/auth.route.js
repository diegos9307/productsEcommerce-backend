import { Router } from "express";
import { confirmUser, login, register } from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator
} from "../middlewares/validationResultExpress.js";

const router = Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/confirm/:emailToken", confirmUser);

export default router;
