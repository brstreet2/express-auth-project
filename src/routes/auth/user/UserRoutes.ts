import express from "express";
import { authenticate, requireRole } from "../../../middleware/AuthMiddleware";
import {
  create,
  get,
  getAll,
  softDelete,
  update,
} from "../../../controllers/auth/user/UserController";
import { Roles } from "@prisma/client";
import {
  validateCreateBody,
  validateDeleteParams,
  validateUpdateRequest,
} from "../../../requests/UserRequestValidation";

const router = express.Router();

router.get(
  "/get",
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  getAll
);

router.get(
  "/get/:id",
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  get
);

router.post(
  "/create",
  validateCreateBody,
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  create
);

router.put(
  "/update/:id",
  validateUpdateRequest,
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  update
);

router.delete(
  "/delete/:id",
  validateDeleteParams,
  authenticate,
  requireRole(Roles.ADMIN || Roles.SUPER_ADMIN),
  softDelete
);

export default router;
