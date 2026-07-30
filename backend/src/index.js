import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./lib/db.js";
import swaggerSpec from "./lib/swagger.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.get("/api-docs/json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    console.log(`Tài liệu API: http://localhost:${PORT}/api-docs`);
  });
});
