// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../../utils/db";

export async function authenticate(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verify token and extract user information
  try {
    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const userId =
      typeof decodedToken.sub === "string" ? decodedToken.sub : undefined;
    const userDb = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    req.user = {
      id: userDb?.id,
      email: userDb?.email,
      role: userDb?.role,
      token: decodedToken,
    }; // Attach user information to req.user
    console.log("Authenticated user:", req.user); // Log the authenticated user
    next(); // Call next after req.user is set
  } catch (error) {
    console.error("Authentication error:", error); // Log authentication error
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function requireRole(role: string) {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const user = req.user;
    console.log("User in requireRole:", user); // Log the user
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
