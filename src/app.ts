import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import AuthRoutes from "./routes/auth/AuthRoutes";

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

app.use("/auth", AuthRoutes);

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
