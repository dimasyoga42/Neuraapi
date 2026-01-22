import express from "express";
import dotenv from "dotenv";
import Main from "./src/route/main.route.js";
import auth from "./src/route/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // atau 5173 (Vite)
  credentials: true

}));

const PORT = 5000
app.use("/api", Main)
app.use("/auth/", auth);
app.get("/docs", (req, res) => {
  res.json({
    developer: "dimasyoga24",
    version: "1.0",

  })
})
app.listen(PORT, () => {
  console.log(`server running in ${PORT}`);
})
