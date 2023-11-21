import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js";
dotenv.config({ path: "./src/backend/config.env" });
import app from "./app.js";
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// User.create({ name: "Ansh", email: "ansh@gmail.com", password: "test1234" });
