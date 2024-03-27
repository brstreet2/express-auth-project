import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: `${process.env.MAIL_HOST}`,
  port: Number(process.env.MAIL_PORT) || 0,
  auth: {
    user: `${process.env.MAIL_USERNAME}`,
    pass: `${process.env.MAIL_PASSWORD}`,
  },
});

// Transporter Logging
transporter.on("idle", () => {
  console.log("Transporter is idle and ready to send emails");
});

transporter.on("error", (error) => {
  console.error("Transporter error:", error);
});

export async function sendResetEmail(
  email: string,
  resetToken: string
): Promise<void> {
  try {
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    const info = await transporter.sendMail({
      from: "admin_project@mailer.com",
      to: email,
      subject: "Reset Password Notification",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #007bff;
                  color: #fff;
                  padding: 10px 0;
                  text-align: center;
                  border-radius: 5px 5px 0 0;
              }
              .body {
                  padding: 20px 0;
              }
              .footer {
                  background-color: #f8f9fa;
                  padding: 10px 0;
                  text-align: center;
                  border-radius: 0 0 5px 5px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Password Reset</h1>
              </div>
              <div class="body">
                  <p>Hello,</p>
                  <p>You requested a password reset. Please click the following link to reset your password:</p>
                  <p><a href="${resetLink}">Reset Password</a></p>
                  <p>If you didn't request this, please ignore this email.</p>
              </div>
              <div class="footer">
                  <p>Best regards,<br>Your Application</p>
              </div>
          </div>
      </body>
      </html>`,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}
