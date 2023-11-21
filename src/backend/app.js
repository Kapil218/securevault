import express from "express";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use("/api", userRoutes);
export default app;
