const jwt = require("jsonwebtoken")
const User = require("../models/User")

const getToken = (req) => {
  const authorization = req.get("Authorization")
  if (authorization?.startsWith("Bearer ")) return authorization.slice(7)
  if (req.cookies?.token) return req.cookies.token
  if (req.body?.token) return req.body.token
  return null
}

exports.auth = async (req, res, next) => {
  try {
    const token = getToken(req)
    if (!token) return res.status(401).json({ success: false, message: "Authentication token is required" })
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (error) {
    return res.status(401).json({ success: false, message: "Authentication token is invalid or expired" })
  }
}

const requireRole = (role) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("accountType")
    if (!user || user.accountType !== role) {
      return res.status(403).json({ success: false, message: `This route is restricted to ${role}s` })
    }
    return next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: "Unable to verify user role" })
  }
}

exports.isStudent = requireRole("Student")
exports.isInstructor = requireRole("Instructor")
exports.isAdmin = requireRole("Admin")
