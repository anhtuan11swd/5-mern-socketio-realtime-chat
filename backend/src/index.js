import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
