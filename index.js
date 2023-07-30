import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

// Middleware
app.use(cookieParser());

app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" })); // Add cors middleware to allow all origins. You can specify specific origins if needed.

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to DB");
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

startServer();
