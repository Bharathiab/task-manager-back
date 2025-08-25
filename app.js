// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// -------- CORS (fixes your error) --------
/**
 * Use comma-separated origins in env:
 * CORS_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
 * If not set, defaults to allowing localhost:5173 only (safe for dev).
 */
const parsedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // allow non-browser tools (e.g., Postman) where origin may be undefined
    if (!origin) return callback(null, true);
    if (parsedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // handle preflight

// -------- Core middleware --------
app.use(express.json());
app.use(morgan("dev"));

// -------- Health check --------
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// -------- Routes --------
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// -------- Fallback 404 --------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
