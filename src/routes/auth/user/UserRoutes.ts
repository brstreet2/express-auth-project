import express from "express";
import { validateRegisterBody } from "../../../middleware/validation/auth/AuthValidationMiddleware";
import { authenticate, requireRole } from "../../../middleware/AuthMiddleware";
import { create, get } from "../../../controllers/auth/user/UserController";
import { Roles } from "@prisma/client";

const router = express.Router();

router.get(
  "/get/:id",
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  get
);

router.post(
  "/create",
  validateRegisterBody,
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  create
);

export default router;
