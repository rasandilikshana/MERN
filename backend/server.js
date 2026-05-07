import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import coursesRouter from "./routes/courses.js";
import lessonsRouter from "./routes/lessons.js";

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/courses", coursesRouter);
app.use("/api/lessons", lessonsRouter);

//Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB error:", err));
