import { Roles } from "@prisma/client";
import { db } from "../../utils/db";
import bcrypt from "bcryptjs";

export async function createUser(
  email: string,
  password: string,
  role: Roles,
  createdBy: string
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      createdBy,
    },
  });
}

export async function getAllUsers(): Promise<any | null> {
  return db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}

export async function getUserById(id: string): Promise<any | null> {
  return db.user.findFirst({
    where: { id: id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });
}

export async function getUserByEmail(email: string): Promise<any | null> {
  return db.user.findUnique({
    where: { email: email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
    },
  });
}
