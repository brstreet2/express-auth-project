import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AuthRoutes from "./routes/auth/AuthRoutes";
import UserRoutes from "./routes/auth/user/UserRoutes";

const app = express();
const port = process.env.PORT || 8001;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

app.use(helmet());
app.use(express.json({ limit: "11mb" }));
app.use(express.urlencoded({ limit: "11mb", extended: true }));
app.use(limiter);

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/auth/user", UserRoutes);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
