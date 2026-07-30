import "dotenv/config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Đã kết nối MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Lỗi: ${error.message}`);
    process.exit(1);
  }
};
