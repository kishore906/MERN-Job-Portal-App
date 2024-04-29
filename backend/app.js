import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// importing all routes
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

// Connecting to DB and running the server
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to Database Successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening On Port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

// routes
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
