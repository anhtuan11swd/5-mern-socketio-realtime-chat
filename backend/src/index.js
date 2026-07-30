import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./lib/db.js";
import swaggerSpec from "./lib/swagger.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.get("/api-docs/json", (_req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    console.log(`Tài liệu API: http://localhost:${PORT}/api-docs`);
  });
});
