import express from "express"
import { Login, Register } from "../controller/auth.js"
import { verifyToken } from "../middleware/auth.js";
const auth = express.Router()


auth.post("/register", Register)
auth.post("/login", Login)
auth.get("/check", verifyToken, (req, res) => {
  res.json({
    message: "Token valid",
    user: req.user,
  });
});

export default auth
