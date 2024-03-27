import { Request, Response } from "express";
import { getUserByEmail } from "../../services/auth/UserService";
import {
  generateResetToken,
  issueToken,
  validateResetToken,
} from "../../services/auth/TokenService";
import { sendResetEmail } from "../../services/mailer/MailerService";
import {
  registerUser,
  updatePassword,
  verifyPassword,
} from "../../services/auth/AuthService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: "Email already exists." });
    }
    await registerUser(email, password);
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid username or password." });
      return;
    }

    const token = issueToken(user.id);

    if (!token) {
      res.status(500).json({ message: "Internal server error." });
    }
    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Invalid email address." });
    }

    const resetToken = generateResetToken(user.id);
    // Send email
    await sendResetEmail(user.email, resetToken);

    res.status(200).json({ message: "Reset token sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invalid email address." });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body;
  try {
    const userId = validateResetToken(token);

    if (!userId) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await updatePassword(userId, password);

    res
      .status(200)
      .json({ message: "You have successfully changed your password." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
