require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")

const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payments")
const courseRoutes = require("./routes/Course")
const contactUsRoute = require("./routes/Contact")
const database = require("./config/database")
const { cloudinaryConnect } = require("./config/cloudinary")

const app = express()
const PORT = process.env.PORT || 4000
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
if (process.env.NODE_ENV !== "production") allowedOrigins.push("http://localhost:3000")

database.connect()
app.use(express.json({ limit: "1mb" }))
app.use(cookieParser())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error("Origin is not allowed by CORS"))
    },
    credentials: true,
  })
)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { fileSize: 10 * 1024 * 1024 },
  })
)

cloudinaryConnect()

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactUsRoute)

app.get("/", (_req, res) => {
  res.json({ success: true, message: "CodeNest API is up and running." })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  if (err?.message === "Origin is not allowed by CORS") {
    return res.status(403).json({ success: false, message: err.message })
  }
  return res.status(500).json({ success: false, message: "Internal server error" })
})

app.listen(PORT, () => console.log(`CodeNest API listening on port ${PORT}`))
