import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Xác thực
 *     summary: Đăng ký tài khoản mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Họ và tên
 *                 example: Nguyễn Văn A
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Địa chỉ email
 *                 example: nguyenvana@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu (tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt)
 *                 example: MyP@ssw0rd
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 664f1a2b3c4d5e6f7a8b9c0d
 *                 fullName:
 *                   type: string
 *                   example: Nguyễn Văn A
 *                 email:
 *                   type: string
 *                   example: nguyenvana@example.com
 *                 profilePic:
 *                   type: string
 *                   example: ""
 *       400:
 *         description: Lỗi dữ liệu đầu vào
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email đã tồn tại
 */
router.post("/signup", signup);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Xác thực
 *     summary: Đăng nhập
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Địa chỉ email
 *                 example: nguyenvana@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mật khẩu
 *                 example: MyP@ssw0rd
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 664f1a2b3c4d5e6f7a8b9c0d
 *                 fullName:
 *                   type: string
 *                   example: Nguyễn Văn A
 *                 email:
 *                   type: string
 *                   example: nguyenvana@example.com
 *                 profilePic:
 *                   type: string
 *                   example: ""
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email hoặc mật khẩu không hợp lệ
 */
router.post("/login", login);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Xác thực
 *     summary: Đăng xuất
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đăng xuất thành công
 */
router.post("/logout", logout);

export default router;
