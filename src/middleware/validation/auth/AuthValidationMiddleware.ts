import { NextFunction, Request, Response } from "express";

export function validateRegisterBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, fullName } = req.body;

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

  // Validate optional fullName field if provided
  if (fullName) {
    if (typeof fullName !== "string") {
      return res.status(400).json({ error: "Full name must be a string" });
    }
    // Regular expression to validate full name format (allowing letters, spaces, and hyphens)
    const fullNameRegex = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({ error: "Invalid full name format" });
    }
  }

  next();
}

export function validateLoginBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
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

  next();
}

export function validateForgotPasswordBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email field are required." });
  }

  //   Regex Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  next();
}

export function validateResetPasswordBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, confirmPassword } = req.body;

  // Check if password and confirmPassword are provided
  if (!password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: "New password and confirm password are required" });
  }

  // Check if password meets minimum length requirement
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "New password must be at least 6 characters long" });
  }

  // Check if password matches confirmPassword
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "New password and confirm password do not match" });
  }

  next();
}
