const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(express.json());

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error(err));

// // Routes
// const taskRoutes = require("./routes/taskRoutes"); // import routes
// app.get("/", (req, res) => {
//   res.send("✅ API is running");
// });
// app.use("/api/tasks", taskRoutes); // 👉 use routes with app

// // Start server
// app.listen(PORT, () => {
//   console.log(`API running on http://localhost:${PORT}`);
// });
