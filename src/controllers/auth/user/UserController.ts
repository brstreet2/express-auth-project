import { Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../../../services/auth/UserService";
import { AuthenticatedRequest } from "../../../interface/AuthenticatedRequest";

export async function create(req: AuthenticatedRequest, res: Response) {
  const { email, password, role, name } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    await createUser(email, password, role, user.id, name);
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

export async function getAll(req: AuthenticatedRequest, res: Response) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  try {
    const userDb = await getAllUsers();

    if (!userDb) {
      return res.status(404).json({ message: "Data not found." });
    }

    res.status(200).json(userDb);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function update(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  const userId = req.params.id;

  const { email, name, password, role } = req.body;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }
  try {
    const userDb = await updateUser(
      userId,
      user.id,
      email,
      password,
      name,
      role
    );
    res
      .status(201)
      .json({ message: "User updated successfully.", data: userDb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function softDelete(req: AuthenticatedRequest, res: Response) {
  const user = req.user;
  const userId = req.params.id;

  if (!user) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  try {
    const userDb = await deleteUser(userId, user.id);
    res
      .status(200)
      .json({ message: "User deleted successfully.", data: userDb });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}
