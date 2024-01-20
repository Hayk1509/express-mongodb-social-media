import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import friendRoutes from "./routes/friendRoutes";
import imageRoutes from "./routes/imageRoutes";
import mongoose from "mongoose";
import path from "path";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const mongoURI: string =
  (process.env.MONGO_URI as string) || "Your MongoDB connection url";

const app = express();
const port = process.env.PORT || 3001;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// Parse incoming JSON requests
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
// Define your routes
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/images", imageRoutes);

// Start the Express app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
