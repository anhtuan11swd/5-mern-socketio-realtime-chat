import bcrypt from "bcryptjs";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedUsers = [
  { email: "admin@admin.com", fullName: "Admin", password: "Admin@123" },
  { email: "alice@test.com", fullName: "Alice Nguyễn", password: "Alice@123" },
  { email: "bob@test.com", fullName: "Bob Trần", password: "Bob@123" },
  {
    email: "charlie@test.com",
    fullName: "Charlie Lê",
    password: "Charlie@123",
  },
  { email: "diana@test.com", fullName: "Diana Phạm", password: "Diana@123" },
  { email: "eve@test.com", fullName: "Eve Hoàng", password: "Eve@123" },
  { email: "frank@test.com", fullName: "Frank Vũ", password: "Frank@123" },
  { email: "grace@test.com", fullName: "Grace Đặng", password: "Grace@123" },
];

const seed = async () => {
  await connectDB();
  for (const user of seedUsers) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await User.findOneAndUpdate(
      { email: user.email },
      { ...user, password: hashedPassword },
      { returnDocument: "after", upsert: true },
    );
  }
  console.log("Đã seed dữ liệu người dùng thành công");
  process.exit(0);
};

seed();
