import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/auth/UserService";
import { validateToken } from "../services/auth/TokenService";

export async function authenticate(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = validateToken(token);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userDb = await getUserById(user.userId);
    req.user = {
      id: userDb.id,
      email: userDb.email,
      role: userDb.role,
      token: user,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function requireRole(role: string) {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
