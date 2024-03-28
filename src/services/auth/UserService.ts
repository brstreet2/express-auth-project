import { Roles } from "@prisma/client";
import { db } from "../../utils/db";
import bcrypt from "bcryptjs";

export async function createUser(
  email: string,
  password: string,
  role: Roles,
  createdBy: string,
  name?: string
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.create({
    data: {
      name: name ?? null,
      email,
      password: hashedPassword,
      role,
      createdBy,
    },
  });
}

export async function getAllUsers(): Promise<any | null> {
  return db.user.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      createdBy: true,
      updatedAt: true,
      updatedBy: true,
      deletedAt: true,
      deletedBy: true,
    },
  });
}

export async function getUserById(id: string): Promise<any | null> {
  return db.user.findFirst({
    where: { id: id, isDeleted: false },
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
    where: { email: email, isDeleted: false },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
    },
  });
}

export async function updateUser(
  id: string,
  updatedBy: string,
  email?: string,
  password?: string,
  name?: string,
  role?: Roles
): Promise<any | null> {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      name: name ?? undefined,
      email: email ?? undefined,
      password: password ? await bcrypt.hash(password, 12) : undefined,
      role: role ?? undefined,
      updatedBy,
      updatedAt: new Date(),
    },
    select: {
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });
}

export async function deleteUser(
  id: string,
  deletedBy: string
): Promise<any | null> {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
      deletedBy,
      isDeleted: true,
    },
  });
}
