import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
// Validate JWT_SECRET environment variable
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET tidak ditemukan dalam environment variables");
}

/**
 * Middleware untuk memverifikasi JWT token
 * Token bisa berasal dari cookies atau Authorization header
 */
export const verifyToken = (req, res, next) => {
  // Cek token dari cookies terlebih dahulu, kemudian dari Authorization header
  let token = req.cookies?.token;

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Hapus 'Bearer ' prefix
    }
  }

  // Jika token tidak ditemukan
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token tidak ada! Silakan login terlebih dahulu.",
    });
  }

  // Verifikasi token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle different types of JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token sudah kadaluarsa! Silakan login kembali.",
          error: "TOKEN_EXPIRED",
        });
      } else if (err.name === "JsonWebTokenError") {
        return res.status(403).json({
          success: false,
          message: "Token tidak valid!",
          error: "INVALID_TOKEN",
        });
      } else if (err.name === "NotBeforeError") {
        return res.status(403).json({
          success: false,
          message: "Token belum aktif!",
          error: "TOKEN_NOT_ACTIVE",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Kesalahan verifikasi token!",
          error: "VERIFICATION_ERROR",
        });
      }
    }

    // Token valid, simpan data user ke request object
    req.user = decoded;
    next();
  });
};
