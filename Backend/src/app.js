const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route")
const songRoutes = require("./routes/song.routes")
const recentRoutes = require("./routes/recent.route")
const dashboardRoutes = require("./routes/dashboard.route")
const adminRoutes = require("./routes/admin.routes")
const updateUserRoutes = require("./routes/user.routes")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://mood-flow-ai-nine.vercel.app",
      "https://mood-flow-ai-lyart.vercel.app"
    ];

    const vercelPreview = /^https:\/\/mood-flow-.*\.vercel\.app$/;

    if (!origin || allowedOrigins.includes(origin) || vercelPreview.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// routes
app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)
app.use("/api/recent", recentRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/admin/songs", adminRoutes)
app.use("/api/users", updateUserRoutes)

module.exports = app;