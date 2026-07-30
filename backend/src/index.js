import "dotenv/config";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";
import swaggerSpec from "./lib/swagger.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    credentials: true,
    origin:
      process.env.CLIENT_URL ||
      (process.env.NODE_ENV === "production" ? true : "http://localhost:5173"),
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.get("/api-docs/json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  app.get("/{*path}", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}

const httpServer = http.createServer(app);
initializeSocket(httpServer);

connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    console.log(`Tài liệu API: http://localhost:${PORT}/api-docs`);
  });
});
