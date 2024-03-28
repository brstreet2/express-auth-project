import { Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../../../services/auth/UserService";
import { AuthenticatedRequest } from "../../../interface/AuthenticatedRequest";

export async function create(req: AuthenticatedRequest, res: Response) {
  const { email, password, role } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

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

export async function get(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  const userId = req.params.id;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  try {
    const userDb = await getUserById(userId);

    if (!userDb) {
      res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(userDb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
