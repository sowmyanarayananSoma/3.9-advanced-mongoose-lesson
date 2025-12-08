import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/lesson9db";

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB ✔"))
  .catch(err => console.log("Error:", err));