import { Roles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export function validateCreateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  //   Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  // Validate optional name field if provided
  if (name) {
    if (typeof name !== "string") {
      return res.status(400).json({ error: "Full name must be a string" });
    }
    // Regular expression to validate full name format (allowing letters, spaces, and hyphens)
    const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ error: "Invalid full name format" });
    }
  }

  next();
}

export function validateUpdateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, name, role } = req.body;
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  if (email) {
    //   Regex Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }
  }

  if (password) {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }
  }

  if (role && !(role in Roles)) {
    const availableRoles = Object.values(Roles);
    return res.status(400).json({
      error: `Invalid role, available roles are: ${availableRoles.join(", ")}`,
    });
  }

  if (name) {
    if (typeof name !== "string") {
      return res.status(400).json({ error: "Full name must be a string" });
    }
    // Regular expression to validate full name format (allowing letters, spaces, and hyphens)
    const nameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    if (!nameRegex.test(name)) {
      return res.status(400).json({ error: "Invalid full name format" });
    }
  }

  next();
}

export function validateDeleteParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "Invalid user ID." });
  }

  next();
}
