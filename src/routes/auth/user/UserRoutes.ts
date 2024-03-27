import express from "express";
import { validateRegisterBody } from "../../../middleware/validation/auth/AuthValidationMiddleware";
import {
  authenticate,
  requireRole,
} from "../../../middleware/validation/auth/AuthMiddleware";
import { create } from "../../../controllers/auth/user/UserController";

const router = express.Router();

router.post(
  "/create",
  validateRegisterBody,
  authenticate,
  requireRole("ADMIN" || "SUPER_ADMIN"),
  create
);

export default router;
