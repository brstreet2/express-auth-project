import bcrypt from "bcryptjs";
import { db } from "../../utils/db";

export async function registerUser(
  email: string,
  password: string
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.create({ data: { email, password: hashedPassword } });
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function updatePassword(
  userId: string,
  password: string
): Promise<void> {
  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}
