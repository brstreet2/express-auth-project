import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../../services/auth/UserService";

export async function create(req: Request & { user?: any }, res: Response) {
  const { email, password, role } = req.body;
  const user = req.user;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    await createUser(email, password, role, user.id);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
