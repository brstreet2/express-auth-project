import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../../controllers/auth/AuthController";
import {
  validateForgotPasswordBody,
  validateLoginBody,
  validateRegisterBody,
  validateResetPasswordBody,
} from "../../requests/AuthRequestValidation";

const router = express.Router();

router.post("/register", validateRegisterBody, register);
router.post("/login", validateLoginBody, login);
router.post("/forgot-password", validateForgotPasswordBody, forgotPassword);
router.post("/reset-password", validateResetPasswordBody, resetPassword);

export default router;
