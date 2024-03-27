import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function issueToken(userId: string): string {
  return jwt.sign({ userId }, `${JWT_SECRET}`, {
    expiresIn: "24h",
  });
}

export function validateToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, `${JWT_SECRET}`) as {
      userId: string;
    };

    return decodedToken.userId;
  } catch (error) {
    console.log("" + error);
  }
}

export function generateResetToken(userId: string): string {
  return jwt.sign({ userId }, `${JWT_SECRET}`, {
    expiresIn: "1h",
  });
}

export function validateResetToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, `${JWT_SECRET}`) as {
      userId: string;
    };

    return decodedToken.userId;
  } catch (error) {
    console.log("" + error);
  }
}
