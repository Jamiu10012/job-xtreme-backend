import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import jobRoutes from "./routes/joblisting.js";
import jobSeekerRoutes from "./routes/jobseekers.js";
import resumeRoutes from "./routes/resume.js";
import employerRoute from "./routes/employer.js";
import jobApplicationRoute from "./routes/jobApplication.js";
import savedJobRoute from "./routes/savedJob.js";

const app = express();
dotenv.config();

// Middleware
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/jobseekers", jobSeekerRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/employer", employerRoute);
app.use("/api/jobapp", jobApplicationRoute);
app.use("/api/savedjob", savedJobRoute);

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to job Xtreme</h1>");
// });
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

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // response.header('Access-Control-Allow-Credentials', true);

  next();
});

// Connect to the database and start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(`Connected to DB ${mongoose.connection.host}`);
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

startServer();
